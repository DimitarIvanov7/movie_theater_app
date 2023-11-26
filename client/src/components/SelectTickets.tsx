import React, { useEffect, useState } from 'react';
import { ContentWrapper } from './Layout/ContentWrapper';
import Select from './Common/Select';
import { makeRequest } from '@/pages/api/utils';

const SelectTickets = () => {
  const [cities, setCities] = useState([]);

  const [selectedCityIndex, setSelectedCityIndex] = useState<null | number>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const request = await makeRequest('places/cities');

      if (request.ok) {
        setCities(request.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-96">
      <h2>БИЛЕТИ</h2>

      <div className="flex justify-between">
        <Select
          headline="ИЗБЕРИ КИНО"
          options={cities}
          onSelect={(index) => setSelectedCityIndex(index)}
        />
        {/* <Tabs></Tabs> */}
      </div>
    </div>
  );
};

export default SelectTickets;
