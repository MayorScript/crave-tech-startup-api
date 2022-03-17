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
            phase: {
              type: mongoose.Schema.Types.ObjectId, 
              ref: "phase"
            }
          },
          { timestamps: true },
        );
        schema.method('toJSON', function(this: any) {
        const { __v, _id, ...object } = this.toObject();
            object.id = _id;
            return object;
        });
        const Task = mongoose.model('task',schema);
        return Task;
}