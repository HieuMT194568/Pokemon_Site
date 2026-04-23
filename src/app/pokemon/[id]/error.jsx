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
        title="Oops!"
        subTitle="We had trouble fetching this Pokémon's data."
        extra={
          <Button type="primary" onClick={() => reset()}>
            Try Again
          </Button>
        }
      />
    </div>
  );
}
