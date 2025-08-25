//http://192.168.0.83/HelloJSP/mock.json

// map (mapping)
// {first_name, last_name} => {name}

fetch("http://192.168.0.83/HelloJSP/mock.json")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    data
      .map((elem) => {
        // first_name, last_name = name
        const newElem = {
          no: elem.id, // 바꿈
          name: elem.first_name + "/" + elem.last_name, // 바꿈
          email: elem.email, // 안바꿈
          salary: elem.salary, // 안바꿈
        };
        return newElem; // 리턴해야함
      })
      .forEach((elem) => {
        console.log(elem.no + ": " + elem.name);
      });
  })
  .catch();
