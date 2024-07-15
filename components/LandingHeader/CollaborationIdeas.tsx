import React from "react";
import { Link } from "@/navigation";

interface CollaborationIdeasProps {
  creatorDomain: string; // Adjust as needed
}

const CollaborationIdeas: React.FC<CollaborationIdeasProps> = ({
  creatorDomain,
}) => {
  return (
    <div className="flex flex-col items-start p-6">
      <h1 className="mb-2 text-center text-4xl font-bold">
        New collaboration ideas of the day
      </h1>
      <p className="mb-6 text-center text-gray-600">
        Content creators can create ideas by uploading social media content as
        the vibe box, and pre-adding items in the post to attract new brands
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href={`${creatorDomain}/discover`}>
          <button className="rounded-md border border-black px-4 py-2">
            + search influencers
          </button>
        </Link>
        <Link href={`${creatorDomain}/discover`}>
          <button className="rounded-md border border-black px-4 py-2">
            + find influencers by url
          </button>
        </Link>
        <Link href={`${creatorDomain}/discover`}>
          <button className="rounded-md border border-black px-4 py-2">
            + find influencers by existing influencers
          </button>
        </Link>
        <Link href={`${creatorDomain}/discover`}>
          <button className="rounded-md border border-black px-4 py-2">
            + recommended by us
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CollaborationIdeas;
