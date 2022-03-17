import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetails = (props) => {
  const router = useRouter();

  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://ibrahima:Tounkara22@lafiameets.up5v7.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = db.collection("meetups");

  const meetups = await collection.find({}, { _id: 1 }).toArray();

  return {
    fallback: false,
    paths: meetups.map((m) => ({
      params: {
        meetupId: m._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const id = context.params.meetupId;
  if (!ObjectId.isValid(id)) return { props: { meetupData: null } };

  const client = await MongoClient.connect(
    "mongodb+srv://ibrahima:Tounkara22@lafiameets.up5v7.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = db.collection("meetups");

  const meetup = await collection.findOne({ _id: ObjectId(id) });

  if (!meetup) return { props: { meetupData: null } };

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        description: meetup.description,
        image: meetup.image,
        address: meetup.address,
      },
    },
  };
}

export default MeetupDetails;
