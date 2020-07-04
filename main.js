$(document).ready(function () {
  //Валидация функционал
  $(function () {
    $("#phone").mask("+7(999) 999-9999");
  });
  const Btn = document.getElementById("popup");
  const popUpCont = document.querySelector(".popup");
  const closeBtn = document.querySelector(".close");
  const form = document.getElementById("order-form");

  // Функция
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = {
      username: event.target.name,
      email: event.target.email,
      phone: event.target.phone,
      textarea: event.target.orderText,
      policy: event.target.policy,
    };
    const check = checkIfValid(data);
    if (check === 4) {
      let name = $("#name").val();
      let email = $("#email").val();
      let phone = $("#phone").val();
      let msg = $("#textarea").val();
      let product = $("#product-order").val();
      let policy = $("#policy").val();

      $.ajax({
        url: "/wp-admin/admin-ajax.php",
        type: "post",
        data: {
          action: "ajax_order",
          name: name,
          email: email,
          phone: phone,
          msg: msg,
          product: product,
          policy: policy,
        },
        success: function (response) {
          $("#order-form").html(response);
        },
      });
      return false;
    }
  });

  function checkIfValid({ username, email, phone, textarea, policy }) {
    let counterCheck = 0;
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const policyBool = policy.checked;
    if (usernameValue === "") {
      error(username, "ФИО не должно быть пустым");
    } else {
      success(username);
      counterCheck++;
    }
    if (emailValue === "") {
      success(email);
      counterCheck++;
    } else {
      if (validateEmail(emailValue)) {
        success(email);
        counterCheck++;
      } else {
        error(email, "Невалидный Email адрес");
      }
    }
    if (phoneValue === "") {
      error(phone, "Телефон обязателен к заполнению");
    } else {
      success(phone);
      counterCheck++;
    }
    if (policyBool) {
      counterCheck++;
      success(policy);
    } else {
      error(policy, "Вы не дали согласия на обработку данных");
    }
    return counterCheck;
  }

  function success(currentInput) {
    const inputSection = currentInput.parentElement;
    const errorInfo = inputSection.querySelector(".info-text");
    errorInfo.innerText = "";

    currentInput.classList.remove("error-validation");
    currentInput.classList.add("success-validation");
  }

  function error(currentInput, text) {
    const inputSection = currentInput.parentElement;
    const errorInfo = inputSection.querySelector(".info-text");

    errorInfo.innerText = text;
    currentInput.classList.remove("success-validation");
    currentInput.classList.add("error-validation");
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  //popUp функционал
  Btn.addEventListener("click", function () {
    popUpCont.style.display = "flex";
  });
  closeBtn.addEventListener("click", function () {
    popUpCont.style.display = "none";
  });
});
