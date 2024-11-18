// src/models/Order.ts

import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from './User';

export interface IOrder extends Document {
  user: IUser['_id'];
  products: {
    product: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  total: number;
  orderedAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
    },
  ],
  total: { type: Number, required: true, min: 0 },
  orderedAt: { type: Date, default: Date.now },
});

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
export default Order;