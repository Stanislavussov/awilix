import { asClass, createContainer, InjectionMode } from 'awilix';

class TestService {
	constructor() { }

	getData(): string {
		return "Hello World"
	}
}

class TestService2 {

	constructor() { }

	getData(): string {
		return "Hello World TestService2"
	}
}


class DependentService {
	constructor(private testService: TestService, private testService2: TestService2) { }

	getInnerData(): string {
		return this.testService.getData() + this.testService2.getData()
	}
}

interface Cradle {
	testService: TestService
	depService: DependentService
	testService2: TestService2
}

const container = createContainer<Cradle>({
	injectionMode: InjectionMode.CLASSIC,
	strict: true,
})

container.register({
	testService: asClass(TestService),
	testService2: asClass(TestService2),
	depService: asClass(DependentService).classic(),
})


const dep2 = container.resolve<DependentService>('depService')

console.log(dep2.getInnerData())