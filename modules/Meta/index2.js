const {Schema, SchemaError, ShortText, Stamp} = require("@VanillaCX/SchemaCX");

class Meta {
    /**
     * INSTANCE
     */

    #schema;
    tags;

    constructor(schema, tags){
        this.#schema = (schema instanceof Schema) ? schema : new Schema(schema);

    }

    set(docFrag){
        const {valid, errors, sanitised} = this.#schema.validatePartial(docFrag);
        
        if(!valid){
            throw new SchemaError(errors);
        }

        this.tags = {...this.tags, ...sanitised}

    }

    validateDoc(tags){
        const {valid, errors, sanitised} = this.#schema.validateDoc(tags);
        
        if(!valid){
            throw new SchemaError(errors);
        }

        this.tags = sanitised;
    }

    get list(){
        return this.tags;
    }

    get schema(){
        return this.#schema;
    }

    
}

module.exports = {Meta}