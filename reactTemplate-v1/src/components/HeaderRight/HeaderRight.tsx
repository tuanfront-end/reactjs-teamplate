import React from 'react';
import { Popover, Avatar, Button } from 'antd';

export default function HeaderRight() {
  const isLoggedIn = true;
  return (
    <div>
      {isLoggedIn ? (
        <Popover placement="bottomRight" title="title" content="content" trigger="click">
          <Avatar
            size="small"
            src="https://images-na.ssl-images-amazon.com/images/M/MV5BODFjZTkwMjItYzRhMS00OWYxLWI3YTUtNWIzOWQ4Yjg4NGZiXkEyXkFqcGdeQXVyMTQ0ODAxNzE@._V1_UX172_CR0,0,172,256_AL_.jpg"
          />
        </Popover>
      ) : (
        <>
          <Button className="mr2">Login</Button>
          <Button type="primary">Register</Button>
        </>
      )}
    </div>
  );
}
