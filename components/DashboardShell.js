import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button,
  Flex,
  Link,
  Avatar,
} from '@chakra-ui/react';
import Logo from './Logo';
import AddSiteModal from './AddSiteModal';

import { useAuth } from '@/lib/auth';

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();

  return (
    <Box backgroundColor='gray.100' h='100vh'>
      <Flex backgroundColor='white' mb={16} w='full'>
        <Flex
          alignItems='center'
          justifyContent='space-between'
          pt={4}
          pb={4}
          maxW='1250px'
          margin='0 auto'
          w='full'
          px={8}
        >
          <Flex gridGap='16px'>
            <Logo size='24px' />
            <Link>Sites</Link>
            <Link>Feedback</Link>
          </Flex>
          <Flex justifyContent='center' alignItems='center'>
            {user && (
              <Button variant='ghost' mr={2} onClick={() => signout()}>
                Log Out
              </Button>
            )}
            <Avatar size='sm' src={user?.photoUrl} />
          </Flex>
        </Flex>
      </Flex>
      <Flex margin='0 auto' direction='column' maxW='1250px' px={8}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent='space-between'>
          <Heading mb={8}>My Sites</Heading>
          <AddSiteModal>+ Add Site</AddSiteModal>
        </Flex>
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
