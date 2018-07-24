# project_2-pet_site

show

    <h3>Marital Status: <%=user.maritalStatus.checked%></h3><br>
    <h3>Children: <%=user.children.checked%></h3><br>
    <h3>Children's Ages (if applicable): <%=user.childrensAges%></h3><br>
    <h3>Yard: <%=user.yard.checked%></h3><br>
    <h3>Other Pets: <%=user.otherPets.checked%></h3><br>


edit

  Marital Status: <input type="checkbox" name="maritalStatus" value="single">
                      <label for="single">Single</label>
                      <input type="checkbox" name="maritalStatus" value="married">
                      <label for="married">Married</label><br>
      Do you have children? <input type="checkbox" name="children" value="yes">
                            <label for="yes">Yes</label>
                            <input type="checkbox" name="children" value="no">
                            <label for="no">No</label><br>
      If Yes, enter children's ages: <input type="text" name="childrenAges" value="<%=user.childrenAges%>"><br>
      Do you have a yard? <input type="checkbox" name="yard" value="yes">
                          <label for="yes">Yes</label>
                          <input type="checkbox" name="yard" value="no">
                          <label for="no">No</label><br>
      Do you have other pets? <input type="checkbox" name="otherPets" value="yes">
                              <label for="yes">Yes</label>
                              <input type="checkbox" name="otherPets" value="no">
                              <label for="no">No</label><br>