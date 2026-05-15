
function showPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const el = document.getElementById('page-'+name);
  if(el){ el.classList.add('active'); window.scrollTo(0,0); }
}
function doSearch(){ showPage('mobile'); }
function setImg(el,src){
  document.getElementById('mainImg').src=src;
  document.querySelectorAll('.thumb').forEach(t=>t.classList.remove('on'));
  el.classList.add('on');
}
function switchTab(btn,tab){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  ['tdesc','trev','tship','tsell'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.style.display=(id===tab)?'block':'none';
  });
}
document.addEventListener('click',function(e){
  if(e.target.classList.contains('wbtn')){
    e.stopPropagation();
    e.target.classList.toggle('on');
    e.target.textContent=e.target.classList.contains('on')?'♥':'♡';
  }
});
(function timer(){
  let d=4,h=13,m=34,s=56;
  setInterval(()=>{
    s--;if(s<0){s=59;m--;}if(m<0){m=59;h--;}if(h<0){h=23;d--;}if(d<0){d=h=m=s=0;}
    ['days','hours','minutes','seconds'].forEach((id,i)=>{
      const el=document.getElementById(id);
      if(el)el.textContent=String([d,h,m,s][i]).padStart(2,'0');
    });
  },1000);
})();

// Cart Page JS

document.addEventListener("DOMContentLoaded", () => {

    const cartItems = document.querySelectorAll(".cart-item");
    const removeButtons = document.querySelectorAll(".btn-rem");
    const saveButtons = document.querySelectorAll(".btn-sfl");
    const moveButtons = document.querySelectorAll(".btn-mv");
    const removeAllBtn = document.querySelector(".btn-remall");
    const qtySelectors = document.querySelectorAll(".qty-sel");

    const subtotalEl = document.querySelectorAll(".summ-row span:last-child")[0];
    const totalEl = document.querySelector(".summ-tot span:last-child");

    const cartTitle = document.querySelector("#page-cart .wrap > div");

    const toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
    let cartData = [
        { price: 78.99, qty: 9 },
        { price: 39.00, qty: 3 },
        { price: 170.50, qty: 1 }
    ];

    function updateTotals() {

        let subtotal = 0;

        cartData.forEach(item => {
            subtotal += item.price * item.qty;
        });

        const discount = 60;
        const tax = 14;

        const total = subtotal - discount + tax;

        subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
        totalEl.innerText = `$${total.toFixed(2)}`;

        updateCartCount();
    }

    function updateCartCount() {

        const count = document.querySelectorAll(".cart-item").length;

        cartTitle.innerHTML = `My cart (${count})`;

    }

    function showToast(type, title, subtitle) {

        const toast = document.createElement("div");
        toast.className = "toast";

        let icon = "✓";

        if(type === "remove") icon = "🗑";
        if(type === "save") icon = "💙";
        if(type === "add") icon = "🛒";
        if(type === "info") icon = "ℹ";

        toast.innerHTML = `
            <div class="toast-icon ${type}">
                ${icon}
            </div>

            <div class="toast-body">
                <div class="toast-title">${title}</div>
                <div class="toast-sub">${subtitle}</div>
            </div>

            <button class="toast-close">&times;</button>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("show");
        }, 100);

        setTimeout(() => {
            removeToast(toast);
        }, 3500);

        toast.querySelector(".toast-close").addEventListener("click", () => {
            removeToast(toast);
        });
    }

    function removeToast(toast) {

        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);
    }

    removeButtons.forEach((button, index) => {

        button.addEventListener("click", () => {

            const item = button.closest(".cart-item");

            item.classList.add("removing");

            setTimeout(() => {

                item.remove();

                cartData.splice(index, 1);

                updateTotals();

                showToast(
                    "remove",
                    "Item removed",
                    "Product removed from cart"
                );

            }, 300);

        });

    });

    saveButtons.forEach(button => {

        button.addEventListener("click", () => {

            const itemName =
                button.closest(".cart-item")
                .querySelector(".ci-name")
                .innerText;

            showToast(
                "save",
                "Saved for later",
                itemName
            );

        });

    });

    moveButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".saved-card");

            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";

            setTimeout(() => {
                card.remove();
            }, 300);

            showToast(
                "add",
                "Moved to cart",
                "Product added successfully"
            );

        });

    });


    removeAllBtn.addEventListener("click", () => {

        document.querySelectorAll(".cart-item").forEach(item => {

            item.classList.add("removing");

            setTimeout(() => {
                item.remove();
            }, 300);

        });

        cartData = [];

        setTimeout(() => {
            updateTotals();
        }, 350);

        showToast(
            "remove",
            "Cart cleared",
            "All products removed"
        );

    });

  
    qtySelectors.forEach((select, index) => {

        select.addEventListener("change", () => {

            const value =
                parseInt(select.value.replace("Qty: ", ""));

            cartData[index].qty = value;

            updateTotals();

            showToast(
                "info",
                "Quantity updated",
                `New quantity: ${value}`
            );

        });

    });

 
    const checkoutBtn = document.querySelector(".btn-checkout");

    checkoutBtn.addEventListener("click", () => {

        showToast(
            "add",
            "Checkout started",
            "Redirecting to payment..."
        );

    });

  
    const couponBtn = document.querySelector(".btn-apcoup");

    couponBtn.addEventListener("click", () => {

        const input =
            document.querySelector(".coup-row input");

        if(input.value.trim() === "") {

            showToast(
                "info",
                "Empty coupon",
                "Please enter a coupon code"
            );

            return;
        }

        showToast(
            "add",
            "Coupon applied",
            `"${input.value}" activated`
        );

        input.value = "";

    });
    updateTotals();

});
