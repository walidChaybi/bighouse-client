import { useQuery, useMutation, gql } from "@apollo/client";
import { List } from "antd";
import { Listing } from "./types";
import "./styles/styles.css";

const LISTINGS = gql`
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
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface props {
  title: string;
}

export const Listings = ({ title }: props) => {
  const { data, loading, error, refetch } = useQuery(LISTINGS);

  const [deleteListing, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_LISTING);

  const listings = data?.listings;

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });
    refetch();
  };

  if (data?.listings.length === 0) return <h2>No listings available</h2>;
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Something went wrong - please try again later :(</h2>;

  const deleteListingLoadingMessage = deleteLoading ? (
    <h4>Deletion in progress</h4>
  ) : null;

  const deleteErrorMessage = deleteError ? (
    <h4>Something went wrong with deleting - please try again later :(</h4>
  ) : null;

  const listingList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={(listing: Listing) => (
        <List.Item>
          <List.Item.Meta title={listing.title} description={listing.address} />
        </List.Item>
      )}
    />
  ) : null;

  return (
    <div className="listings">
      <h2>{title}</h2>
      {listingList}
      {deleteListingLoadingMessage}
      {deleteErrorMessage}
    </div>
  );
};
