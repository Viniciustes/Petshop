import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    document: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true
        }
    },
    email: {
        type: String,
        trim: true,
        index: {
            unique: true
        }
    },
    pets: [
        {
            name: {
                type: String,
                trim: true,
                required: true
            },
            gender: {
                type: String,
                enum: ['male', 'female', 'none']
            },
            kind: {
                type: String,
                trim: true,
                required: true
            },
            brand: {
                type: String
            }
        }
    ],
    billingAddress: {
        zipCode: {
            type: String
        },
        street: {
            type: String
        },
        number: {
            type: String
        },
        complement: {
            type: String
        },
        neighborhood: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        }
    },
    shippingAddress: {
        zipCode: {
            type: String
        },
        street: {
            type: String
        },
        number: {
            type: String
        },
        complement: {
            type: String
        },
        neighborhood: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        }
    },
    creditCard: {
        holder: {
            type: String
        },
        number: {
            type: String
        },
        expiration: {
            type: String
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})