#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("@aws-cdk/core");
const loadgen_stack_1 = require("../lib/loadgen-stack");
const app = new cdk.App();
const envohio = { region: 'us-east-1' };
new loadgen_stack_1.LoadgenStack(app, 'LoadgenStack', { env: envohio });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGdlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvYWRnZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQyx3REFBb0Q7QUFFcEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsTUFBTSxPQUFPLEdBQUcsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFDLENBQUM7QUFDdkMsSUFBSSw0QkFBWSxDQUFDLEdBQUcsRUFBRSxjQUFjLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCB7IExvYWRnZW5TdGFjayB9IGZyb20gJy4uL2xpYi9sb2FkZ2VuLXN0YWNrJztcblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbmNvbnN0IGVudm9oaW8gPSB7IHJlZ2lvbjogJ3VzLWVhc3QtMSd9O1xubmV3IExvYWRnZW5TdGFjayhhcHAsICdMb2FkZ2VuU3RhY2snLCB7IGVudjogZW52b2hpb30pO1xuIl19