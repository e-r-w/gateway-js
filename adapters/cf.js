'use strict';

const contentTypes = require('../lib/content-types');

exports.handle = function(app, options){

  const base = {
    Description: `${options.name} stack`,
    Parameters: {},
    Resources: {
      AppLambdaRole: {
        Type: 'AWS::IAM::Role',
        Properties: { AssumeRolePolicyDocument: {}}
      },
      AppLambda: {
        Type: 'AWS::Lambda::Function',
        Properties: {
          Code: {
            S3Bucket: options.bucket,
            S3Key: options.bucketKey
          },
          Description: `${options.name} lambda app`,
          Handler: 'index.handler',
          Role: {Ref: 'AppLambdaRole'},
          Runtime: 'nodejs4.3',
          Timeout: 30
        }
      },
      Server: {
        Type: 'AWS::ApiGateway::RestApi',
        Properties: {
          Name: options.name
        }
      }
    },
    Outputs: {}
  };

  app.routes.forEach( route => {
    const routeUri = route.uri.slice(1);
    const routeName = routeUri.replace('/', '_');
    base.Resources[routeName] = {
      Type: "AWS::ApiGateway::Resource",
      Properties: {
        PathPart: routeUri,
        RestApiId: {Ref: "Server"}
      }
    };

    const apiMethod = `${routeName}_${route.method.toLowerCase()}`;

    base.Resources[apiMethod] = {
      Type: 'AWS::ApiGateway::Method',
      Properties: {
        AuthorizationType: "NONE",
        HttpMethod: route.method,
        Integration: {
          IntegrationHttpMethod: "POST",
          IntegrationResponses: [],
          RequestParameters: {},
          Type: "AWS",
          Uri: {"Fn::Join": ["", [`arn:aws:apigateway:${options.region}:lambda:path/2015-03-31/functions/`, {"Fn:GetAtt": ["AppLambda", "ARN"]} ,"/invocations"]] }
        },
        ResourceId: {
          "Fn::GetAtt": [
            "Server",
            "RootResourceId"
          ]
        },
        RestApiId: {Ref: "Server"}
      }
    };

    base.Resources[apiMethod].Properties.Integration.RequestTemplates =
      Object
        .keys(contentTypes)
        .map( key => {
          const type = contentTypes[key];
          const obj = {};
          obj[type] = `{"url": "${route.uri}", "method": "${route.method}", "body": $input.body}`;
          return obj;
        })
        .reduce( (a, b) => Object.assign({}, a, b) );
  });

  return base;
};