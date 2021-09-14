import { Button } from "@material-ui/core";
import React from "react";

const Pagination = (props) => {
  const handlePageChange = (newPage) => {
    return () => {
      if (props.onPageChange) {
        props.onPageChange(newPage);
      }
    };
  };
  return (
    <div style={{ textAlign: "center" }}>
      <Button
        variant="contained"
        size="medium"
        color="primary"
        style={{ marginRight: "15px" }}
        onClick={handlePageChange(props.page?.currentPage - 1)}
        disabled={props.page?.currentPage <= 1}
      >
        Prev
      </Button>
      <Button
        variant="contained"
        size="medium"
        color="primary"
        onClick={handlePageChange(props.page?.currentPage + 1)}
        disabled={props.page?.currentPage === props.page?.totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
