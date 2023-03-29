import { ConsoleLogger } from '@nestjs/common';
import { LoggerParamters } from './interfaces/logger.interface';

enum EventType {
	DB_CALL = 'Database call', //"Event related to db calls, includes : response from select query, update and create "
	EXTERNAL_API_CALL = 'External API call', //"Event related to third party or other module calls( add request & response in opts) ",
}
export class Logger extends ConsoleLogger {
	// TODO :
	// - OPTIONAL: We will see, if we can make the whole log as an object, for seeing it better in Dashbird logs and for better querying of logs in future.

	log(opts: LoggerParamters, taskType?: string) {
		const displayMessage = this.customLoggerHelper(opts, taskType);

		super.log(displayMessage);
	}

	error(opts) {
		const displayMessage = this.customLoggerHelper(opts, 'ERROR');

		super.error(displayMessage);
	}

	verbose(opts, taskType?: string) {
		const displayMessage = this.customLoggerHelper(opts, taskType);

		super.verbose(displayMessage);
	}

	customLoggerHelper(opts: LoggerParamters, taskType?: string) {
		let displayMessage = taskType ? 'EVENT : ' + taskType : '';

		if (opts.endPoint) {
			displayMessage = displayMessage == '' ? '' : displayMessage + ', ';
			displayMessage += 'ROUTE : ' + opts.endPoint;
		}

		if (opts.userData) {
			displayMessage = displayMessage == '' ? '' : displayMessage + ', ';
			displayMessage += 'USER DATA : ' + JSON.stringify(opts.userData);
		}

		if (opts.data) {
			displayMessage = displayMessage == '' ? '' : displayMessage + ', ';
			displayMessage += 'DATA : ' + JSON.stringify(opts.data);
		}

		if (opts.request) {
			displayMessage = displayMessage == '' ? '' : displayMessage + ', ';
			displayMessage += 'REQUEST : ' + JSON.stringify(opts.request);
		}

		if (opts.response) {
			displayMessage = displayMessage == '' ? '' : displayMessage + ', ';
			displayMessage += 'RESPONSE : ' + JSON.stringify(opts.response);
		}

		displayMessage = opts.message ? displayMessage + ', MESSAGE : ' + opts.message : displayMessage;

		return displayMessage;
	}
}
export { EventType };
