import React from "react";
import Button from "react-bootstrap/Button";
import { Container } from "reactstrap";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import "../../styles/casemanagement.module.css";
import Footer from "./Footer";
import CaseCategory from "./CaseCategory";
import AddCaseModal from "./Modals/AddCaseModal";
import { useQuery } from "urql";
import AddCategoryModal from "./Modals/AddCategoryModal";
import DeleteCaseModal from "./Modals/DeleteCaseModal";
import DeleteCategoryModal from "./Modals/DeleteCategoryModal";
import { nullableTypeAnnotation } from "@babel/types";

/* 
  FEATURE 1 TODO:
  Write a query that will get the name AND id of 
  every category. Build this query, and verify it 
  works in Hasura, and then paste the query here.

  Make sure to replace the string that is currently
  in this variable 
*/

export const ManagementContainerQuery = `
query ManagementContainerQuery {
    category{
      name
      id
    }
  }
`;
// END TODO

export type ManagementCategory = {
  id: number;
  name: string;
};

const CaseManagementContainer: React.FC = (props) => {
  const [addCaseModalOpen, setAddCaseModalOpen] =
    React.useState<boolean>(false);
  const [addCategoryModalOpen, setAddCategoryModalOpen] =
    React.useState<boolean>(false);
  const [deleteCaseModalOpen, setDeleteCaseModalOpen] =
    React.useState<boolean>(false);
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] =
    React.useState<boolean>(false);
  /* NOTE: This uses */
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ManagementContainerQuery,
  });

  return (
    <>
      <h5 className="title">Home Page</h5>
      <Grid container spacing={3}>
        {/*
          FEATURE 1 TODO:
          Use the data from the result of the query to render 
          a CaseCategory for every category in the response.
          Remember, the response is stored in the "data" variable!
        */}
        {data
                ? data.category.map((n: ManagementCategory, index: number) =>{
                  return <Grid item key={index} xs={4}> <CaseCategory category_id={n.id} />
                    </Grid>;
                }): "Something went wrong"}

        {/* END TODO */}
      </Grid>

      <AddCaseModal
        onClose={() => setAddCaseModalOpen(false)}
        open={addCaseModalOpen}
      />

      <AddCategoryModal
        onClose={() => setAddCategoryModalOpen(false)}
        open={addCategoryModalOpen}
      />

      <DeleteCaseModal
        onClose={() => setDeleteCaseModalOpen(false)}
        open={deleteCaseModalOpen}
      />

      <DeleteCategoryModal
        onClose={() => setDeleteCategoryModalOpen(false)}
        open={deleteCategoryModalOpen}
      />

      <Container
        style={{
          width: "100%",
          borderStyle: "solid",
          padding: "0.75rem",
          marginTop: "0.75rem",
        }}
      >
        <Button variant="dark" onClick={() => setAddCategoryModalOpen(true)}>
          Add Category
        </Button>
        <Button variant="dark" onClick={() => setDeleteCategoryModalOpen(true)}>
          Delete Category
        </Button>
        <Button variant="dark" onClick={() => setAddCaseModalOpen(true)}>
          Add Case
        </Button>
        <Button variant="dark" onClick={() => setDeleteCaseModalOpen(true)}>
          Delete Case
        </Button>
        <Button variant="dark" onClick={() => "redirect"}>
          Edit Case
        </Button>
      </Container>
    </>
  );
};
export default CaseManagementContainer;
