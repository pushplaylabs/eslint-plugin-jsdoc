// After `importMeta` no longer experimental, we can use this ESM
//   approach over `__dirname`?
// import {fileURLToPath} from 'url';
// import {join, dirname} from 'path';
// join(dirname(fileURLToPath(import.meta.url)), 'babel-eslint')
import {join} from 'path';

export default {
  invalid: [
    {
      code: `
          /**
           * @param Foo
           */
          function quux (foo = 'FOO') {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @param names to be "foo". Got "Foo".'
        }
      ]
    },
    {
      code: `
          /**
           * @arg Foo
           */
          function quux (foo = 'FOO') {

          }
      `,
      errors: [
        {
          message: 'Expected @arg names to be "foo". Got "Foo".'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'arg'
          }
        }
      }
    },
    {
      code: `
          /**
           * @param Foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Expected @param names to be "foo". Got "Foo".'
        }
      ]
    },
    {
      code: `
          /**
           * @param Foo.Bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: '@param path declaration ("Foo.Bar") appears before any real parameter.'
        }
      ]
    },
    {
      code: `
          /**
           * @param foo
           * @param Foo.Bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: '@param path declaration ("Foo.Bar") root node name ("Foo") does not match previous real parameter name ("foo").'
        }
      ]
    },
    {
      code: `
          /**
           * @param foo
           * @param foo.bar
           * @param bar
           */
          function quux (bar, foo) {

          }
      `,
      errors: [
        {
          message: 'Expected @param names to be "bar, foo". Got "foo, bar".'
        }
      ]
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 4,
          message: '@param "bar" does not match an existing function parameter.'
        }
      ]
    },
    {
      code: `
          /**
           * @param foo
           * @param foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Duplicate @param "foo"'
        }
      ]
    },
    {
      code: `
          /**
           * @param foo
           * @param foo
           */
          function quux (foo, bar) {

          }
      `,
      errors: [
        {
          message: 'Duplicate @param "foo"'
        }
      ]
    },
    {
      code: `
          /**
           * @param foo
           * @param foo
           */
          function quux (foo, foo) {

          }
      `,
      errors: [
        {
          message: 'Duplicate @param "foo"'
        }
      ]
    }
  ],
  valid: [
    {
      code: `
          /**
           *
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo, bar) {

          }
      `
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo, bar, baz) {

          }
      `
    },
    {
      code: `
          /**
           * @param foo
           * @param foo.foo
           * @param bar
           */
          function quux (foo, bar) {

          }
      `
    },
    {
      code: `
          /**
           * @param args
           */
          function quux (...args) {

          }
      `
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux ({a, b}) {

          }
      `
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux ({a, b} = {}) {

          }
      `
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux ([a, b] = []) {

          }
      `
    },
    {
      code: `
          /**
           * Assign the project to a list of employees.
           * @param {Object[]} employees - The employees who are responsible for the project.
           * @param {string} employees[].name - The name of an employee.
           * @param {string} employees[].department - The employee's department.
           */
          function assign (employees) {

          };
      `
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param property
           */
          constructor(private property: string) {}
        }
      `,
      parser: join(__dirname, '../../../node_modules', '@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module'
      }
    }
  ]
};
