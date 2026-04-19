// ================= TEMPLATE MODAL =================
function openTemplateModal() {
  document.getElementById("template-modal").style.display = "flex";
}

function closeTemplateModal() {
  document.getElementById("template-modal").style.display = "none";
}

function confirmPurchase() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("يجب تسجيل الدخول أولاً");
    closeTemplateModal();
    openModal();
    return;
  }

  alert("تمت عملية الشراء بنجاح 🎉");
  closeTemplateModal();
}