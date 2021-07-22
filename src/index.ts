import {CircuitBreaker} from './circuit-breaker';


const request = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (Math.random() > .6) {
            resolve( "Success")
        } else {
            reject( "Failed")
        }
    });
};

const breaker = new CircuitBreaker(request, {minFailedRequestThreshold: 2});

setInterval(() => breaker.fire()
    .then(console.log)
    .catch((e) => console.error(e.message)), 1000);