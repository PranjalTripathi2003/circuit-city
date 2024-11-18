import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShippingFast,
  faIndianRupeeSign,
  faHeadset,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';

const ShopFeatures = () => {
  return (
    <div className="max-w-screen-lg mx-auto mt-20">
      <h2 className="text-center text-4xl font-bold mt-10 mb-10">Our Promise</h2>
      <div className="bg-gray-100 rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faShippingFast} className="h-8 w-8 text-gray-800" />
            <h3 className="mt-2 text-md font-medium">Free Shipping</h3>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faIndianRupeeSign} className="h-8 w-8 text-gray-800" />
            <h3 className="mt-2 text-md font-medium">Money Guarantee</h3>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faHeadset} className="h-8 w-8 text-gray-800" />
            <h3 className="mt-2 text-md font-medium">Online Support</h3>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faCreditCard} className="h-8 w-8 text-gray-800" />
            <h3 className="mt-2 text-md font-medium">Flexible Payment</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopFeatures;