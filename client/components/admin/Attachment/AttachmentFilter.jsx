import React from "react";
import Button from "../../UI/Button/Button";

export default function AttachmentFilters({ searchBox, onSearch, onFilter }) {
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-lg-6">
          <div className="h-flex mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={onSearch}
              value={searchBox}
            />
            <Button onClick={onFilter} className="border-secondary mx-2">
              Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
