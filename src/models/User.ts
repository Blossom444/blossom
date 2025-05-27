import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ім\'я обов\'язкове'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email обов\'язковий'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Пароль обов\'язковий'],
    minlength: [6, 'Пароль повинен містити мінімум 6 символів'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  accessibleMeditations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meditation',
  }],
  accessiblePractices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Practice',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Оновлення updatedAt перед кожним збереженням
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema); 