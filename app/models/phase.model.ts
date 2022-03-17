const Task = require('./task.model');
module.exports = (mongoose:any) => {
        let schema = mongoose.Schema(
            {
                title: {
                    type: String,
                    required: true
                },
                completed: {
                    type: Boolean,
                    default: false,
                },
                tasks: [
                    {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "task"
                    }
                ]
            },
            {timestamps: true}
        );
        schema.method('toJSON', function(this: any) {
        const { __v, _id, ...object } = this.toObject();
            object.id = _id;
            return object;
        });
        const Phase = mongoose.model('phase',schema);
        return Phase;
}