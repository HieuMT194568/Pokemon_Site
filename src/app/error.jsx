"use client";

import { useEffect } from "react";
import { Button, Result } from "antd";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
      <Result
        status="500"
        title="Something went wrong!"
        subTitle="There was an error communicating with the database."
        extra={
          <Button type="primary" onClick={() => reset()}>
            Try Again
          </Button>
        }
      />
    </div>
  );
}
