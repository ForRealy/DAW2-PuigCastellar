"use strict";
class BasicEntity {
    constructor(name, id) {
        this.name = name;
        function NameableMixin(Base) {
            return class extends Base {
                constructor() {
                    super(...arguments);
                    this.name = "Unnamed";
                }
            };
        }
        function IdentifiableMixin(Base) {
            return class extends Base {
                constructor() {
                    super(...arguments);
                    this.id = 0;
                }
            };
        }
        class BaseEntity {
            constructor(entity) {
                this.entity = entity;
            }
            logProperty(key) {
                console.log(`The value of ${key.toString()} is:`, this.entity[key]);
            }
        }
    }
}
//TODO
