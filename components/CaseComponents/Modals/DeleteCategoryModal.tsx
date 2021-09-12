import React, { useState } from "react";
import StyledModal from "./StyledModal";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useMutation, useQuery } from "urql";
import {
  ManagementCategory,
  ManagementContainerQuery,
} from "../CaseManagementContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
  })
);

type DeleteCategoryModalProps = {
  open: boolean;
  onClose: () => void;
};

const UnaddCategoryMutation = `
mutation deleteCategory($category_id: bigint = 0) {
    delete_category(where: {id: {_eq: $category_id}}) {
      affected_rows
    }
  } `; 
const UnaddCaseMutation = `
  mutation deleteCaseForCategory($category_id: Int = 0) {
    delete_cases(where: {category_id: {_eq: $category_id}}) {
      affected_rows
    }
  } `; 
 
// END TODO

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = (props) => {
  const classes = useStyles();
  const [category, setCategory] = useState<number | null>(null);
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ManagementContainerQuery,
  });

  const [result2, executeMutation2] = useMutation(UnaddCaseMutation);
  const [result, executeMutation] = useMutation(UnaddCategoryMutation);
  


  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <Typography variant="h4" align="center">
        Delete Category
      </Typography>
      <Box>
        {data ? (
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              fullWidth
              value={category}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setCategory(event.target.value as number);
              }}
            >
              {data
                ? data.category.map((category: ManagementCategory, index: number) =>{
                  return <MenuItem key={index} value={category.id}>
                    {category.name}
                      </MenuItem>;
                }): "Something went wrong"}
            </Select>
          </FormControl>
        ) : fetching ? (
          "Loading Categories"
        ) : null}
      </Box>
      <Box mt="10px" display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => {
            executeMutation2({
                category_id: category,
              });
            executeMutation({
              category_id: category,
            });
            props.onClose();
          }}
        >
          Submit
        </Button>
      </Box>
    </StyledModal>
  );
};
export default DeleteCategoryModal;
