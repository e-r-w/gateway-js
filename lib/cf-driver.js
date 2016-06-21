'use strict';

class CfDriver {
  constructor(options){
    this.config = options;
  }
  generate(app){
    return new Promise( (resolve, reject) => {

      const base = {
        Description: `${this.config.name} stack`,
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
                S3Bucket: this.config.bucket,
                S3Key: this.config.bucketKey
              },
              Description: `${this.config.name} lambda app`,
              Handler: 'index.handler',
              Role: {Ref: 'AppLambdaRole'},
              Runtime: 'nodejs4.3',
              Timeout: 30
            }
          },
          Server: {
            Type: 'AWS::ApiGateway::RestApi',
            Properties: {
              Name: this.config.name
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
        base.Resources[`${routeName}_${route.method.toLowerCase()}`] = {
          Type: 'AWS::ApiGateway::Method',
          Properties: {
            AuthorizationType: "NONE",
            HttpMethod: route.method,
            Integration: {
              IntegrationHttpMethod: "POST",
              IntegrationResponses: [],
              RequestParameters: {},
              RequestTemplates: {
                'application/json': `{"url": "${route.uri}", "body": $input.body}`
              },
              Type: "AWS",
              Uri: {"Fn::Join": ["", [`arn:aws:apigateway:${this.config.region}:lambda:path/2015-03-31/functions/`, {"Fn:GetAtt": ["AppLambda", "ARN"]} ,"/invocations"]] }
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
      });

      resolve(base);
    })
  }
}

module.exports = CfDriver;