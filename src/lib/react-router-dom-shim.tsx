import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import React from 'react';

type NavigateTarget = string | number;

type LinkLikeProps = Omit<NextLinkProps, 'href'> & {
  to?: NextLinkProps['href'];
  href?: NextLinkProps['href'];
  className?: string;
  children?: React.ReactNode;
};

export const BrowserRouter = ({ children }: PropsWithChildren) => <>{children}</>;
export const Routes = ({ children }: PropsWithChildren) => <>{children}</>;
export const Route = ({ element }: { element: React.ReactNode }) => <>{element}</>;

export const Link = ({ to, href, ...props }: LinkLikeProps) => {
  const targetHref = to ?? href ?? '#';
  return <NextLink href={targetHref} {...props} />;
};

export const useNavigate = () => {
  const router = useRouter();
  return (to: NavigateTarget) => {
    if (typeof to === 'number') {
      router.back();
    } else {
      router.push(to);
    }
  };
};

export const useParams = () => {
  const router = useRouter();
  // Next.js query params are already parsed; coerce to string map for compatibility
  return router.query as Record<string, string>;
};

export const useLocation = () => {
  const router = useRouter();
  return {
    pathname: router.asPath,
  };
};
