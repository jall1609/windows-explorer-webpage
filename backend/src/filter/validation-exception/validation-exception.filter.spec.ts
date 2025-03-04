import { CustomValidationFilter } from "./validation-exception.filter";

describe('ValidationExceptionFilter', () => {
  it('should be defined', () => {
    expect(new CustomValidationFilter()).toBeDefined();
  });
});
