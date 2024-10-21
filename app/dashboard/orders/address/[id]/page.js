import { FetchSingleOrder } from '@/app/lib/FetchOrders';

const Address = async({params}) => {
  const {id} = params;
  const addresses = await FetchSingleOrder(id)
  // const addresses = [
  //   {
  //     country: 'India',
  //     state: 'Telangana',
  //     city: 'Hyderabad',
  //     pincode: '500001',
  //     fullAddress: '123 Street Name, Hyderabad, Telangana, 500001',
  //     mapLink: 'https://www.google.com/maps?q=Hyderabad',
  //   },
  //   {
  //     country: 'USA',
  //     state: 'California',
  //     city: 'Los Angeles',
  //     pincode: '90001',
  //     fullAddress: '456 Avenue, Los Angeles, California, 90001',
  //     mapLink: 'https://www.google.com/maps?q=Los+Angeles',
  //   },
  // ];

  return (
    <div className="container mx-auto p-4 overflow-y-auto h-[100%]">
      <h1 className="text-2xl font-bold mb-4">Ordered Address</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white text-left text-sm">
              <th className="py-3 px-4">Country</th>
              <th className="py-3 px-4">State</th>
              <th className="py-3 px-4">City/Village</th>
              <th className="py-3 px-4">Pincode</th>
              <th className="py-3 px-4">Full Address</th>
              <th className="py-3 px-4">Map</th>
            </tr>
          </thead>
          <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 border-r border-gray-200">{addresses.address.country}</td>
                <td className="py-3 px-4 border-r border-gray-200">{addresses.address.state}</td>
                <td className="py-3 px-4 border-r border-gray-200">{addresses.address.cityVillage}</td>
                <td className="py-3 px-4 border-r border-gray-200">{addresses.address.pincode}</td>
                <td className="py-3 px-4 border-r border-gray-200">{addresses.address.fulladdress}</td>
                <td className="py-3 px-4 text-nowrap">
                  <a 
                    href={`https://www.google.com/maps?q=${addresses.address.location.latitude},${addresses.address.location.longitude}`}

                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    View on Map
                  </a>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Address;
