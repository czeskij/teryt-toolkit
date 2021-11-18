import { Teryt } from ".";

describe("Teryt class", () => {
    it('should initialize with provided config', () => {
        const instance: Teryt = new Teryt({
            username: 'test',
            password: '1234'
        });

        expect(instance).toBeInstanceOf(Teryt);
    });

    it('should not initialize and throw error without valid config', () => {
        expect(() => {
            new Teryt({
                username: '',
                password: ''
            });
        }).toThrowError();
    });
});