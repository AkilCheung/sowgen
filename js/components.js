//dms source
srcRef = {
    "Oracle": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.Oracle.html',
    "SQLServer": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.SQLServer.html',
    "AzureSQLServer": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.AzureSQL.html',
    "PostgresSQL": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.PostgreSQL.html',
    "MySQL": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.MySQL.html',
    "SAP": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.SAP.html',
    "MongoDB": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.MongoDB.html',
    "DocumentDB": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.DocumentDB.html',
    "S3": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.S3.html',
    "DB2": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.DB2.html'
};

//dms destination
destRef = {
    "Oracle": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.Oracle.html',
    "SQLServer": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.SQLServer.html',
    "PostgresSQL": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.PostgreSQL.html',
    "MySQL": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.MySQL.html',
    "Redshift": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.Redshift.html',
    "SAP": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.SAP.html',
    "S3": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.S3.html',
    "DDB": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.DynamoDB.html',
    "Kinesis": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.Kinesis.html',
    "Kafka": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.Kafka.html',
    "Elasticsearch": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.Elasticsearch.html',
    "DocumentDB": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.DocumentDB.html',
    "Neptune": 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.Neptune.html',
}

/*** prepare the content
 * Components may includes the below parts:
 * - Assumptions
 * - SOW
 * - Customer Responsibility
 * - Out of scope
 * */
var components = [];

/*
Component Block Sample, you can copy this to create a new component:
components['name'] = {};
components['name'].assumptions = [];
components['name'].sowHeader = '';
components['name'].sow = [];
components['name'].customerResp = [];
components['name'].oos = [];
components['name'].sowHandler = () => {}; //optional
components['name'].assumptionsHandler = () => {}; //optional
*/

//EC2
components['comp_res'] = {};
components['comp_res'].assumptions = [];
components['comp_res'].sowHeader = 'AWS EC2 provisioning';
components['comp_res'].sow = [
    'N x Production EC2',
    'N x Bastion Host EC2',
    'Basic Security Groups setup',
    'Install & update EC2 with latest EC2 System Manager',
    'Perform one-batch of security patch on OS level before system launch',
    'Setup daily auto snapshot with default retention period 30 days'
];
components['comp_res'].customerResp = [
    'Migrate for the customer data, application and software'
];
components['comp_res'].oos = [];

//cloudfront CDN
components['cdn'] = {};
components['cdn'].assumptions = [
    'CloudFront only cache static resources (e.g. js, css, images)'
];
components['cdn'].sowHeader = 'AWS CloudFront provisioning';
components['cdn'].sow = [
    'Define and create 1 x CloudFront Distribution',
    'Configure origin settings',
    'Configure cache behavior settings',
    'Configure distribution settings'
];
components['cdn'].customerResp = [];
components['cdn'].oos = [];

//vpn
components['vpn'] = {};
components['vpn'].assumptions = [
    'Customer Gateway device meets the AWS requirements (https://docs.aws.amazon.com/vpc/latest/adminguide/Introduction.html#CGRequirements)',
    'Application is accessed through VPN connection'
];
components['vpn'].sowHeader = 'Site-to-Site VPN connection setup';
components['vpn'].sow = [
    'Create Customer Gateway in AWS console',
    'Create Virtual Private Gateway and attach to VPC',
    'Create VPN Connection with on-premise subnet',
    'Provide "Router Configuration" file for on-premise router configuration',
    'Configure Route Table propagation'
];
components['vpn'].customerResp = [
    'Configuration for on-premise network, including but not limited to firewall settings, rules settings and internal network routing',
    'Configuration for on-premise VPN Router'
];
components['vpn'].oos = [];

//basic environment setup
components['basic_env'] = {};
components['basic_env'].assumptions = [];
components['basic_env'].sowHeader = 'AWS environment provisioning';
components['basic_env'].sow = [
    'Setup CloudTrail config for auditing',
    'Setup AWS Config for environment logging',
    'Setup IAM accounts (max: 3)',
    'Configure CloudWatch alarm to monitor instances health and send health alarm notification (max: 3 email addresses)'
];
components['basic_env'].customerResp = [];
components['basic_env'].oos = [];

//basic network setup
components['basic_network'] = {};
components['basic_network'].assumptions = [];
components['basic_network'].sowHeader = 'AWS networking setup';
components['basic_network'].sow = [
    '1 x VPC design and setup',
    'Subnets formation and configurations',
    'NACLs, Route Tables configurations',
    'Internet Gateway provision and associations',
    'NAT Gateway provision and associations'
];
components['basic_network'].customerResp = [];
components['basic_network'].oos = [];

//direct connect
components['direct_connect'] = {};
components['direct_connect'].assumptions = [
    'Customer Gateway supports Border Gateway Protocol (BGP) with MD5 Authentication',
];
components['direct_connect'].sowHeader = 'Direct Connect connection';
components['direct_connect'].sow = [
    'Create Direct Connection Gateway',
    'Download LOA file and send to client to deliver to ISP',
    'Create Virtual interface',
    'Attach VIF and Virtual Gateway to Direct Connect Gateway',
    'Provide â€œRouter Configurationâ€ file for on-premise router configuration',
    'Update VPC route table'
];
components['direct_connect'].customerResp = [];
components['direct_connect'].oos = [];

//vm import/export
components['vm_export'] = {};
components['vm_export'].assumptions = [
    'On-premise resource are in a virtualized environment (e.g. VMware)',
    'On-premise resource can be exported',
    'Exported VM source OS is supported by AWS VM import (https://docs.aws.amazon.com/vm-import/latest/userguide/vmie_prereqs.html)',
    'Exported VM file type can be imported into AWS '
];
components['vm_export'].sowHeader = ['VM Export/Import'];
components['vm_export'].sow = [
    'VM export by client in AWS supported VM file type',
    'Upload the exported VM file to S3',
    'Import exported VM file and provision EC2 instance'
];
components['vm_export'].customerResp = [];
components['vm_export'].oos = ['VM (network/OS/Application) configurations after VM import'];

//WAF
components['waf'] = {};
components['waf'].assumptions = [];
components['waf'].sowHeader = 'AWS WAF WebACL and rules setup based on OWASP top 10';
components['waf'].sow = [
    'Provision 1 x WAF WebACL',
    'Setup managed rule groups',
    '-	Core Rule Set (CRS)',
    '-	Admin Protection',
    '-	Known Bad Inputs',
    '-	SQL Database',
    '-	Linux/Windows operating system',
    '-	Amazon IP Reputation',
    '-	BotControl'
];
components['waf'].customerResp = [];
components['waf'].oos = [];

//application with ALB
components['app_alb'] = {};
components['app_alb'].assumptions = [
    'Application supports multiple instances for high availability',
    'Application Load Balancer is used to distribute traffic to application instances, sticky session will be used if the application requires stateful session'
];
components['app_alb'].sowHeader = '';
components['app_alb'].sow = [];
components['app_alb'].customerResp = [];
components['app_alb'].oos = [];
components['app_alb'].sowHandler = () => {
    components['comp_res'].sow.push('Application Load Balancers setup');
    components['comp_res'].sow.push('ALB Target Groups associations');
};

//auto scaling
components['autoscale'] = {};
components['autoscale'].assumptions = [
    'Application supports auto scaling including scaling in & out'
];
components['autoscale'].sowHeader = 'AWS auto scaling groups configurations';
components['autoscale'].sow = [
    'Create 1 x Auto Scaling Group for EC2',
    'Creating a launch configuration',
    'Tagging Auto Scaling Group and instances',
    'Attach to a Load Balancer',
    'Setup Load Balancer Health Check with Auto Scaling'
];
components['autoscale'].customerResp = [];
components['autoscale'].oos = [];

//rds with multi-AZ
components['rds_multi_az'] = {};
components['rds_multi_az'].assumptions = [
    'RDS enables multi AZ for high availability'
];
components['rds_multi_az'].sowHeader = 'AWS database services provisioning';
components['rds_multi_az'].sow = [
    'N x RDS with multi-AZ',
    'Setup daily auto snapshot with default retention period 30 days'
];
components['rds_multi_az'].customerResp = [
    'Perform the database schema design and configuration'
];
components['rds_multi_az'].oos = [];

//rds without multi-AZ
components['rds'] = {};
components['rds'].assumptions = [];
components['rds'].sowHeader = 'AWS database services provisioning';
components['rds'].sow = [
    'N x RDS without multi-AZ',
    'Setup daily auto snapshot with default retention period 30 days'
];
components['rds'].customerResp = [
    'Perform the database schema design and configuration'
];
components['rds'].oos = [];

//redis without multi-AZ
components['redis'] = {};
components['redis'].assumptions = [];
components['redis'].sowHeader = 'Elastic Cache for Redis provisioning';
components['redis'].sow = [
    'Elastic Cache for Redis without multi-AZ',
    'Provide access information'
];
components['redis'].customerResp = [];
components['redis'].oos = [];

//redis with multi-AZ
components['redis_multi_az'] = {};
components['redis_multi_az'].assumptions = [];
components['redis_multi_az'].sowHeader = 'Elastic Cache for Redis provisioning';
components['redis_multi_az'].sow = [
    'Elastic Cache for Redis with multi-AZ',
    'Provide access information'
];
components['redis_multi_az'].customerResp = [];
components['redis_multi_az'].oos = [];

//Aurora with Replica
components['aurora_rep'] = {};
components['aurora_rep'].assumptions = [
    'Aurora cluster endpoint for read/write',
    'Aurora reader endpoint for read only '
];
components['aurora_rep'].sowHeader = 'Amazon Aurora DB cluster provision';
components['aurora_rep'].sow = [
    'N x Aurora DB cluster',
    'Create N Replica',
    'Setup daily auto snapshot with default retention period 30 days'
];
components['aurora_rep'].customerResp = [
    'Perform the database schema design and configuration'
];
components['aurora_rep'].oos = [];
components['aurora_rep'].sowHandler = () => {}; //optional
components['aurora_rep'].assumptionsHandler = () => {}; //optional

//Aurora with Replica
components['aurora'] = {};
components['aurora'].assumptions = [
    'Aurora cluster endpoint for read/write'
];
components['aurora'].sowHeader = 'Amazon Aurora DB cluster provision';
components['aurora'].sow = [
    'N x Aurora DB cluster',
    'Setup daily auto snapshot with default retention period 30 days'
];
components['aurora'].customerResp = [
    'Perform the database schema design and configuration'
];
components['aurora'].oos = [];
components['aurora'].sowHandler = () => {}; //optional
components['aurora'].assumptionsHandler = () => {}; //optional

//s3
components['s3'] = {};
components['s3'].assumptions = [];
components['s3'].sowHeader = 'AWS S3 provisioning';
components['s3'].sow = [
    'S3 Bucket for logs'
];
components['s3'].customerResp = [];
components['s3'].oos = [];

//EFS
components['efs'] = {};
components['efs'].assumptions = [];
components['efs'].sowHeader = 'AWS EFS provisioning';
components['efs'].sow = [
    'Setup and Configure EFS',
    'Configure file system access (2 AZs)',
    'Mounting Amazon EFS File System automatically',
    'Configure EC2 to mount EFS'
];
components['efs'].customerResp = [];
components['efs'].oos = [];

//Documentation
components['doc'] = {};
components['doc'].assumptions = [];
components['doc'].sowHeader = 'Documentations';
components['doc'].sow = [];
components['doc'].customerResp = [];
components['doc'].oos = [];


//System infrastructure documentation
components['doc_infra'] = {};
components['doc_infra'].assumptions = [];
components['doc_infra'].sowHeader = '';
components['doc_infra'].sow = [];
components['doc_infra'].customerResp = [];
components['doc_infra'].oos = [];
components['doc_infra'].sowHandler = () => {
    components['doc'].sow.push([
        'System infrastructure documentation'
    ]);
};

//Stress test report and results analysis
components['doc_stress'] = {};
components['doc_stress'].assumptions = [];
components['doc_stress'].sowHeader = '';
components['doc_stress'].sow = [];
components['doc_stress'].customerResp = [];
components['doc_stress'].oos = [];
components['doc_stress'].sowHandler = () => {
    components['doc'].sow.push([
        'Stress test report and results analysis'
    ]);
};

//storage gateway - volume
components['gw_volume'] = {};
components['gw_volume'].assumptions = [
    'On-premise VM appliance or physical hardware appliance for storage gateway meets the AWS requirements (https://docs.aws.amazon.com/storagegateway/latest/userguide/Requirements.html#requirements-host)'
];
components['gw_volume'].sowHeader = '';
components['gw_volume'].sow = [];
components['gw_volume'].customerResp = [];
components['gw_volume'].oos = [];

//storage gateway - file
components['gw_file'] = {};
components['gw_file'].assumptions = [
    'On-premise VM appliance or physical hardware appliance for storage gateway meets the AWS requirements (https://docs.aws.amazon.com/storagegateway/latest/userguide/Requirements.html#requirements-host)'
];
components['gw_file'].sowHeader = 'Storage gateway - File gateway setup';
components['gw_file'].sow = [
    'Assist to install gateway in on-premise environment',
    'Create HTTP proxy on EC2',
    'Activate and configure gateway',
    'Create file share using NFS or SMB'
];
components['gw_file'].customerResp = [
    'Install storage gateway in on-premise environment',
    'Mount the share file of storage gateway in on-premise environment'
];
components['gw_file'].oos = [];

//storage gateway - tap
components['gw_tap'] = {};
components['gw_tap'].assumptions = [
    'On-premise VM appliance or physical hardware appliance for storage gateway meets the AWS requirements (https://docs.aws.amazon.com/storagegateway/latest/userguide/Requirements.html#requirements-host)'
];
components['gw_tap'].sowHeader = '';
components['gw_tap'].sow = [];
components['gw_tap'].customerResp = [];
components['gw_tap'].oos = [];

//infra test
components['infra_test'] = {};
components['infra_test'].assumptions = [];
components['infra_test'].sowHeader = 'Infrastructure Acceptance Test with client';
components['infra_test'].sow = [];
components['infra_test'].customerResp = [];
components['infra_test'].oos = [];

const generalOOS = [
    'Cloud Optimisation, such as decoupling database to RDS',
    'Any application deployment and development',
    'Update software endpoint',
    'Update DNS record',
    'Domain Controller configuration',
    'Migration of existing Active Directory',
    'Configuration on operating system or application',
    'Ongoing OS and software patching',
    'Application testing and debugging',
    'High Availability design and implementation',
    'Auto-scaling for EC2 instances',
    'Load Test and Stress Test',
    'Server log storage consolidation and management',
    'Instance and OS hardening'
];

// cloudendure
components['cloudendure'] = {};
components['cloudendure'].assumptions = [
    'Servers in existing infrastructure can connect to internet',
    'VMs or Servers to be migrated is supported by CloudEndure (https://docs.cloudendure.com/Content/Getting_Started_with_CloudEndure/Supported_Operating_Systems/Supported_Operating_Systems.htm)'
];
components['cloudendure'].sowHeader = 'CloudEndure Server Migration';
components['cloudendure'].sow = [
    'Remote login the server going to be migrated to cloud',
    'Install CloudEndure agent to existing servers',
    'Initiate data replication in CloudEndure management console',
    'Bring up EC2 instance in AWS environment in Test Mode for verification',
    'Perform migration cutover'
];

components['cloudendure'].customerResp = [
    'Allow CloudEndure agent to be installed on the source machines with admin access',
    'Provide remote access for environment to be migrated',
    'Be responsible for software license running in AWS environment',
    'Data, application and software services migration and reconfiguration',
    'DNS record update'
];
components['cloudendure'].oos = [];


// cloudendure for DR
components['cloudendure_dr'] = {};
components['cloudendure_dr'].assumptions = [
    'Servers in existing infrastructure can connect to internet',
    'VMs or Servers to be migrated is supported by CloudEndure (https://docs.cloudendure.com/Content/Getting_Started_with_CloudEndure/Supported_Operating_Systems/Supported_Operating_Systems.htm)'
];
components['cloudendure_dr'].sowHeader = 'CloudEndure for DR';
components['cloudendure_dr'].sow = [
    'Remote login the server that need to be implement DR solution',
    'Install CloudEndure agent to existing servers',
    'Initiate data replication in CloudEndure management console',
    'Bring up EC2 instance in AWS environment in Test Mode for verification',
    'Perform a failover drill',
    'Perform a fallback drill without synchronizing back the data to the source',
    'Perform a fallback drill by synchronizing back the data to the source'
];

components['cloudendure_dr'].customerResp = [
    'Allow CloudEndure agent to be installed on the source machines with admin access',
    'Provide remote access for environment to be migrated',
    'Be responsible for software license running in AWS environment',
    'Data, application and software services migration and reconfiguration',
    'DNS record update'
];
components['cloudendure_dr'].oos = [];

//workspaces with simple AD
components['ws_simple_ad'] = {};
components['ws_simple_ad'].assumptions = [
    'Amazon WorkSpaces use AWS Simple AD as the authentication',
    'Amazon WorkSpaces Window bundle Standard Plus (2 vCPU, 4 GiB Memory, 80GB root volume, 10GB user volume) will be used',
    'Billing option as Monthly'
];
components['ws_simple_ad'].sowHeader = 'Amazon WorkSpaces setup';
components['ws_simple_ad'].sow = [
    'Create and configure Amazon WorkSpaces',
    'Create and configure simple AD',
    'Create xx Workspaces for xx users'
];
components['ws_simple_ad'].customerResp = [];
components['ws_simple_ad'].oos = [];
components['ws_simple_ad'].sowHandler = () => {};

//workspaces with managed AD
components['ws_managed_ad'] = {};
components['ws_managed_ad'].assumptions = [
    'Amazon WorkSpaces use AWS Managed AD as the authentication',
    'Amazon WorkSpaces Window bundle Standard Plus (2 vCPU, 4 GiB Memory, 80GB root volume, 10GB user volume) will be used',
    'Billing option as Monthly'
];
components['ws_managed_ad'].sowHeader = 'Amazon WorkSpaces setup';
components['ws_managed_ad'].sow = [
    'Create and configure Amazon WorkSpaces',
    'Create and configure Managed AD',
    'Create xx Workspaces for xx users'
];
components['ws_managed_ad'].customerResp = [];
components['ws_managed_ad'].oos = [];
components['ws_managed_ad'].sowHandler = () => {
    components['comp_res'].sow.push([
        'Setup a EC2 for AD management'
    ]);
};

//workspaces with AD connector
components['ws_ad_connector'] = {};
components['ws_ad_connector'].assumptions = [
    'Amazon WorkSpaces use AD connector as the authentication',
    'Amazon WorkSpaces Window bundle Standard Plus (2 vCPU, 4 GiB Memory, 80GB root volume, 10GB user volume) will be used',
    'Billing option as Monthly'
];
components['ws_ad_connector'].sowHeader = 'Amazon WorkSpaces setup';
components['ws_ad_connector'].sow = [
    'Create and configure Amazon WorkSpaces',
    'Create and configure AD Connector',
    'Create xx Workspaces for xx users'
];
components['ws_ad_connector'].customerResp = [];
components['ws_ad_connector'].oos = [];
components['ws_ad_connector'].sowHandler = () => {};

//MFA for workspaces
components['ws_mfa'] = {};
components['ws_mfa'].assumptions = [
    'FreeRADUIS and LinOTP are used for MFA',
    'Google Authenticator is used for MFA'
];
components['ws_mfa'].sowHeader = '';
components['ws_mfa'].sow = [];
components['ws_mfa'].customerResp = [];
components['ws_mfa'].oos = [];
components['ws_mfa'].sowHandler = () => {
    components['comp_res'].sow.push([
        'Install FreeRADIUS and LinOTP on provision EC2'
    ]);

    components['doc'].sow.push([
        'MFA token registration guide'
    ])
};

//ECR
components['ecr'] = {};
components['ecr'].assumptions = [];
components['ecr'].sowHeader = 'AWS ECR configurations';
components['ecr'].sow = [
    'Create repository',
    'Enable scan on push feature',
    'Create IAM policy to control the access of ECR and provide the access information to client'
];
components['ecr'].customerResp = [
    'Maintain the docker images in ECR'
];
components['ecr'].oos = [];
components['ecr'].sowHandler = () => {};

//EKS
components['eks'] = {};
components['eks'].assumptions = [
    'K8s pods deployment and configuration are handled by client'
];
components['eks'].sowHeader = 'EKS Cluster configurations';
components['eks'].sow = [
    'Create EKS cluster with EC2',
    'Install SSM in worker nodes',
    'Add IAM users or roles to EKS cluster'
];
components['eks'].customerResp = [
    'Services configurations in EKS'
];
components['eks'].oos = [];
components['eks'].sowHandler = () => {};

//EKS with Fargate
components['eks-fargate'] = {};
components['eks-fargate'].assumptions = [
    'K8s pods deployment and configuration are handled by client'
];
components['eks-fargate'].sowHeader = 'EKS Cluster configurations';
components['eks-fargate'].sow = [
    'Create EKS cluster with Fargate',    
    'Add IAM users or roles to EKS cluster'
];
components['eks-fargate'].customerResp = [
    'Services configurations in EKS'
];
components['eks-fargate'].oos = [];
components['eks-fargate'].sowHandler = () => {};

//ECS
components['ecs'] = {};
components['ecs'].assumptions = [
    'ECS task definition and deployment are handled by client'
];
components['ecs'].sowHeader = 'ECS Cluster configuration';
components['ecs'].sow = [
    'Create ECS cluster with EC2',
    'Install SSM in worker nodes',
    'Create required roles for task role and execution role'
];
components['ecs'].customerResp = [
    'Prepare container image and ECS task definition'
];
components['ecs'].oos = [];
components['ecs'].sowHandler = () => {};

//ECS with Fargate
components['ecs-fargate'] = {};
components['ecs-fargate'].assumptions = [
    'ECS task definition and deployment are handled by client'
];
components['ecs-fargate'].sowHeader = 'ECS Cluster configuration';
components['ecs-fargate'].sow = [
    'Create ECS cluster with Fargate',
    'Create required roles for task role and execution role'
];
components['ecs-fargate'].customerResp = [
    'Prepare container image and ECS task definition'
];
components['ecs-fargate'].oos = [];
components['ecs-fargate'].sowHandler = () => {};

//DMS
components['dms'] = {};
components['dms'].assumptions = [
    'Source database and destination database are always on'
];
components['dms'].sowHeader = 'AWS Database Migration Service configuration';
components['dms'].sow = [
    'Provision DMS instance in Multi-AZ',
    'Setup CloudWatch alarm for high utilization of DMS instance',
    'Setup CloudWatch alarm for high replication latency'
];
components['dms'].customerResp = [
    'Configure the source database',
    'Provide user account in source database with sufficient permission for migration'
];
components['dms'].oos = [
    'Database optmization'
];
components['dms'].sowHandler = () => {
    if ($('#dmsSrc').val() == 'MongoDB' || $('#dmsSrc').val() == 'DocumentDB')
        components['dms'].sow.push('Configure DMS to replicate all collections from source database to destination database');
    else
        components['dms'].sow.push('Configure DMS to replicate all tables from source database to destination database');
};
components['dms'].assumptionsHandler = () => {
    //get the dropdown values
    components['dms'].assumptions.push('Source database is fulfilled the requirements (#ref_link#) and ready for replication'.replace('#ref_link#', srcRef[$('#dmsSrc').val()]));    
    components['dms'].assumptions.push('Destination database is fulfilled the requirements (#ref_link#) and ready for replication'.replace('#ref_link#', srcRef[$('#dmsDest').val()]));

    if ($('#dmsSrc').val() == 'MongoDB' || $('#dmsSrc').val() == 'DocumentDB')
        components['dms'].assumptions.push('Replication for all collections in source database');
    else
        components['dms'].assumptions.push('Replication for all tables in source database');
};

//SQS
components['SQS'] = {};
components['SQS'].assumptions = [];
components['SQS'].sowHeader = 'SQS Provision';
components['SQS'].sow = [
    'Provision a standard queue'
];
components['SQS'].customerResp = [
    'Client provides the settings for SQS queue'
];
components['SQS'].oos = [
    'Application integration with SQS'
];
components['SQS'].sowHandler = () => {}; //optional
components['SQS'].assumptionsHandler = () => {}; //optional

//MSK
components['msk'] = {};
components['msk'].assumptions = [];
components['msk'].sowHeader = 'MSK Provision';
components['msk'].sow = [
    'Provision a MSK cluster',
    'Provide Apache ZooKeeper connection string',
    'Create IAM for Amazon MSK APIs and Apache Kafka APIs'
];
components['msk'].customerResp = [
    'Client configure Apache Kafka ACLs',
    'Client create Apache Kafka topics'
];
components['msk'].oos = [
    'Application integration with MSK'
];
components['msk'].sowHandler = () => {}; //optional
components['msk'].assumptionsHandler = () => {}; //optional
