export function shouldBeEqualTo(target) {
    return ({ field, form }) => {
      const fieldsAreEquals = (form.$(target).value === field.value);
      return [fieldsAreEquals, `The ${field.label} should be equals to ${form.$(target).label}`];
    };
  }