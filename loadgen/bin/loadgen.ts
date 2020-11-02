#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LoadgenStack } from '../lib/loadgen-stack';

const app = new cdk.App();
const envohio = { region: 'us-east-1'};
new LoadgenStack(app, 'LoadgenStack', { env: envohio});
