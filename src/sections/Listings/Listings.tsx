import { server } from "../../lib/api";

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating}}`;

interface props {
  title: string;
}

export const Listings = ({ title }: props) => {
  const fetchListings = async () => {
    const { data } = await server.fetch({ query: LISTINGS });
    console.log(data);
  };

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Query listings</button>
    </div>
  );
};
