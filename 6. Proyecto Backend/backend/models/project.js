'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  name:       { type: String, required: true, trim: true },
  description:{ type: String, required: true, trim: true },
  category:   { type: String, required: true, trim: true },
  year:       { type: Number, required: true },
  // 👇 langs ahora es un array de strings
  langs: {
    type: [String],
    default: [],
    // Permite mandar "RUBY, JAVA" o ["RUBY","JAVA"]
    set: (v) => {
      if (Array.isArray(v)) {
        return v.map(x => String(x).trim()).filter(Boolean);
      }
      if (typeof v === 'string') {
        return v.split(',').map(s => s.trim()).filter(Boolean);
      }
      return [];
    }
  },
  image: { type: String, default: null }
});

module.exports = mongoose.model('Project', ProjectSchema);
