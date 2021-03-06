import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import { createFeedback } from '@/lib/db';

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
    },
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

const SiteFeedback = ({ initialFeedback }) => {
  const auth = useAuth();
  const router = useRouter();

  // Local mutation for displaying new feedback immediately
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onSubmit = (e) => {
    e.preventDefault();

    // Get comment
    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      // text could've been fetched via useRef
      text: e.target.elements.comment.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending',
    };

    // Save to db
    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);

    // Clear input
    e.target.elements.comment.value = '';
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      width='full'
      maxWidth='700px'
      margin='0 auto'
    >
      <Box as='form' onSubmit={onSubmit}>
        <FormControl id='comment' my={8}>
          <FormLabel htmlFor='comment'>Comment</FormLabel>
          <Input type='comment' id='comment' mb={4} />
          <Button type='submit' fontWeight='medium'>
            Add Comment
          </Button>
        </FormControl>
      </Box>
      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
};

export default SiteFeedback;
