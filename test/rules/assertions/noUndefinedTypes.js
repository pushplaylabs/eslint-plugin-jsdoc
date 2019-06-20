export default {
  invalid: [
    {
      code: `
        /**
         * @param {HerType} baz - Foo.
         */
       function quux(foo, bar, baz) {

       }
      `,
      errors: [
        {
          message: 'Invalid `settings.jsdoc.preferredTypes`. Values must be falsy, a string, or an object.'
        },
        {
          message: 'The type \'HerType\' is undefined.'
        }
      ],
      options: [{
        preferredTypesDefined: true
      }],
      settings: {
        jsdoc: {
          preferredTypes: {
            HerType: 1000
          }
        }
      }
    },
    {
      code: `
        /**
         * @param {HerType} baz - Foo.
         */
       function quux(foo, bar, baz) {

       }
      `,
      errors: [
        {
          message: 'The type \'HerType\' is undefined.'
        }
      ],
      options: [{
        preferredTypesDefined: true
      }],
      settings: {
        jsdoc: {
          preferredTypes: {
            HerType: false
          }
        }
      }
    },
    {
      code: `
          /**
           * @param {strnig} foo - Bar.
           */
          function quux(foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'The type \'strnig\' is undefined.'
        }
      ],
      rules: {
        'no-undef': 'error'
      }
    },
    {
      code: `
        /**
         * @param {MyType} foo - Bar.
         * @param {HisType} bar - Foo.
         */
         function quux(foo, bar) {

         }
      `,
      errors: [
        {
          line: 4,
          message: 'The type \'HisType\' is undefined.'
        }
      ],
      options: [{
        definedTypes: ['MyType']
      }]
    },
    {
      code: `
        /**
         * @param {MyType} foo - Bar.
         * @param {HisType} bar - Foo.
         * @param {HerType} baz - Foo.
         */
       function quux(foo, bar, baz) {

       }
      `,
      errors: [
        {
          line: 4,
          message: 'The type \'HisType\' is undefined.'
        }
      ],
      options: [{
        definedTypes: ['MyType'],
        preferredTypesDefined: true
      }],
      settings: {
        jsdoc: {
          preferredTypes: {
            hertype: {
              replacement: 'HerType'
            }
          }
        }
      }
    },
    {
      code: `
        /**
         * @param {MyType} foo - Bar.
         * @param {HisType} bar - Foo.
         * @param {HerType} baz - Foo.
         */
       function quux(foo, bar, baz) {

       }
      `,
      errors: [
        {
          line: 5,
          message: 'The type \'HerType\' is undefined.'
        }
      ],
      options: [{
        definedTypes: ['MyType'],
        preferredTypesDefined: true
      }],
      settings: {
        jsdoc: {
          preferredTypes: {
            hertype: {
              replacement: false
            },
            histype: 'HisType'
          }
        }
      }
    }
  ],
  valid: [
    {
      code: `
          /**
           * @param {string} foo - Bar.
           */
          function quux(foo) {

          }
      `
    },
    {
      code: `
          /**
           * @param {Promise} foo - Bar.
           */
          function quux(foo) {

          }
      `,
      env: {
        es6: true
      }
    },
    {
      code: `
          class MyClass {}

          /**
           * @param {MyClass} foo - Bar.
           */
          function quux(foo) {
            console.log(foo);
          }

          quux(0);
      `,
      rules: {
        'no-unused-vars': 'error'
      }
    },
    {
      code: `
        const MyType = require('my-library').MyType;

        /**
         * @param {MyType} foo - Bar.
         */
          function quux(foo) {

        }
      `,
      env: {
        node: true
      }
    },
    {
      code: `
        const MyType = require('my-library').MyType;

        /**
         * @param {MyType} foo - Bar.
         */
          function quux(foo) {

        }
      `,
      env: {
        node: false
      }
    },
    {
      code: `
        import {MyType} from 'my-library';

        /**
         * @param {MyType} foo - Bar.
         * @param {Object<string, number>} foo
         * @param {Array<string>} baz
         */
          function quux(foo, bar, baz) {

        }
      `,
      parserOptions: {
        sourceType: 'module'
      }
    },
    {
      code: `
        /*globals MyType*/

        /**
         * @param {MyType} foo - Bar.
         * @param {HisType} bar - Foo.
         */
          function quux(foo, bar) {

        }
      `,
      globals: {
        HisType: true
      }
    },
    {
      code: `
        /**
         * @typedef {Object} hello
         * @property {string} a - a.
         */

        /**
         * @param {hello} foo
         */
        function quux(foo) {

        }
      `
    },
    {
      code: `
        /**
         * @param {Array<syntaxError} foo
         */
        function quux(foo) {

        }
      `
    },
    {
      code: `
      /**
       * Callback test.
       *
       * @callback addStuffCallback
       * @param {String} sum - An test integer.
       */
      /**
       * Test Eslint.
       *
       * @param {addStuffCallback} callback - A callback to run.
       */
      function testFunction(callback) {
        callback();
      }
      `
    },
    {
      code: `
      /**
       *
       *
       */
      function foo () {

      }
      `
    },
    {
      code: `
      /**
       *
       *
       */
      function foo () {

      }
      `,
      options: [{
        preferredTypesDefined: true
      }]
    },
    {
      code: `
        /**
         * @param {MyType} foo - Bar.
         * @param {HisType} bar - Foo.
         */
         function quux(foo, bar) {

         }
      `,
      options: [{
        definedTypes: ['MyType', 'HisType']
      }]
    },
    {
      code: `
        /**
         * @param {MyType} foo - Bar.
         * @param {HisType} bar - Foo.
         * @param {HerType} baz - Foo.
         */
       function quux(foo, bar, baz) {

       }
      `,
      options: [{
        definedTypes: ['MyType'],
        preferredTypesDefined: true
      }],
      settings: {
        jsdoc: {
          preferredTypes: {
            hertype: {
              replacement: 'HerType'
            },
            histype: 'HisType'
          }
        }
      }
    },
    {
      code: `
        /**
         * @param {MyType} foo - Bar.
         * @param {HisType} bar - Foo.
         * @param {HerType} baz - Foo.
         */
       function quux(foo, bar, baz) {

       }
      `,
      options: [{
        definedTypes: ['MyType'],
        preferredTypesDefined: true
      }],
      settings: {
        jsdoc: {
          preferredTypes: {
            hertype: {
              replacement: 'HerType<>'
            },
            histype: 'HisType.<>'
          }
        }
      }
    },
    {
      code: `
      /**
       * @template TEMPLATE_TYPE
       */
      class Foo {
        /**
         * @return {TEMPLATE_TYPE}
         */
        bar () {
        }
      }
      `
    }
  ]
};
