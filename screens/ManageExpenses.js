import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import { ExpensesContext } from "../store/expenses-context";
import { GlobalStyles } from "../constants/style";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [error, setError] = useState();

  const [isUpadteOrAdd, setIsUpadteOrAdd] = useState(false);

  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsUpadteOrAdd(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Error Occured while deleting");
      setIsUpadteOrAdd(false);
    }

    //
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        setIsUpadteOrAdd(true);
        await updateExpense(editedExpenseId, expenseData);
        // setIsUpadteOrAdd(false);
      } else {
        const id = await storeExpense(expenseData);
        setIsUpadteOrAdd(true);
        expensesCtx.addExpense({ ...expenseData, id: id });
        // setIsUpadteOrAdd(false);
      }
      navigation.goBack();
    } catch (error) {
      setError("Error occured");
      setIsUpadteOrAdd(false);
    }
  }

  if (error && !isUpadteOrAdd) {
    return <ErrorOverlay message={error} />;
  }

  if (isUpadteOrAdd) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onButtonPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
