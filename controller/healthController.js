const healthController = (request, response) => {
    const healthcheck = {
        uptime: Math.floor(process.uptime()),
        responseTime: process.hrtime(),
        message: "OK",
        timestamp: Date.now(),
    };
    try {
        response.send(healthcheck);
    } catch (error) {
        healthcheck.message = error;
        response.status(503).send();
    }
};

module.exports = healthController;
