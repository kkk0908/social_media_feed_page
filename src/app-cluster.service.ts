import cluster from 'cluster';
import * as os from 'os';

export class Cluster {
	static register(numWorkers: number, callback: () => void): void {
		if (!cluster.isPrimary) {
			callback();
			return;
		}

		console.log(`Master server started on ${process.pid}`);

		// Ensure workers exit cleanly
		process.on('SIGINT', () => {
			console.log('Cluster shutting down...');
			for (const workerId in cluster.workers) {
				cluster.workers[workerId].kill();
			}
			process.exit(0);
		});

		const cpuCount = os.cpus().length;
		const workerCount = Math.min(numWorkers, cpuCount);

		for (let i = 0; i < workerCount; i++) {
			cluster.fork();
		}

		cluster.on('online', (worker) => {
			console.log(`Worker ${worker.process.pid} is online`);
		});

		cluster.on('exit', (worker, code, signal) => {
			console.log(`Worker ${worker.process.pid} died. Restarting`);
			cluster.fork();
		});
	}
}
