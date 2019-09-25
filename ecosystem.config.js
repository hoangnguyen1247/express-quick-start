module.exports = {
    apps: [
        {
            name: "express_quickstart_dev",
            script: "npm run start:deploy",
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            },
        },
        {
            name: "express_quickstart",
            script: "npm run start:deploy",
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            },
        }
    ],
    deploy: {
        development: {
            "user":  "develop",
            "host" : "api-dev.yourserver.com",
            "ref" : "origin/develop",
            "repo" : "git@github.com:hoangnguyen1247/express-quick-start.git",
            "path" : "/usr/src/express/express-quick-start",
            "post-deploy" : "npm install && pm2 startOrRestart ecosystem.config.js --only express_quickstart_dev --env development",
            "env": {
                "NODE_ENV": "development",
            },
        },
        production: {
            "user":  "develop",
            "host" : "api.yourserver.com",
            "ref" : "origin/develop",
            "repo" : "git@github.com:hoangnguyen1247/express-quick-start.git",
            "path" : "/usr/src/express/express-quick-start",
            "post-deploy" : "npm install && pm2 startOrRestart ecosystem.config.js --only express_quickstart --env development",
            "env": {
                "NODE_ENV": "production",
            },
        },
    },
}
