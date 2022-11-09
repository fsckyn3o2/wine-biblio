import Fastify from 'fastify';

const fastify = Fastify({
    logger: false
});

function startGetEndpoint(url, data, status, port = 8090  ) {
    return new Promise(function (resolve) {
        fastify.get(url, function(req, res) {
            res.status(status).send(data);
        });

        fastify.listen({port: port, hostname: 'localhost'}, function(err, addr) {
            if(err) {
                console.log(err);
                process.exit(1);
            }
            resolve(addr);
        });
    });
}

function endServer()
{
    return new Promise(function (resolve) {
        fastify.close(resolve);
    });
}

export const httpServer = {startGetEndpoint: startGetEndpoint, endServer: endServer};
