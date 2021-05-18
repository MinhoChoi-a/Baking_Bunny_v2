exports.order = (req, res, next) => {

    var customer = JSON.parse(req.body.cust_obj);
    var order = JSON.parse(req.body.ord_obj);
    
    let cake_num = 0;
    let dacq_num = 0;
  
    var date = req.body.schedule; 
    date = date.split(' ')[0];
  
    var sum = 0;
  
    var time_array = ''; 
    var pick_time = '';
  
    var inch = ['6 inch', '8 inch'];
  
    try{
      
      let email_content =
      "<body><div class='order_confirm'>"+
         "<h3>Order Request</h3>"+
         "<table style='background: rgba(248, 227, 222, 0.6); width:350px; padding: 5px;'>"+
           `<tr><td>Schedule</td><td>${req.body.schedule}</td></tr>`+
           `<tr><td>Name</td><td>${customer.name}</td></tr>`+
           `<tr><td>Name on E-Transfer</td><td>${customer.etransfer}</td></tr>`+
           `<tr><td>insta/email</td><td>${customer.insta}</td></tr>`+
           `<tr><td>Phone</td><td>${customer.phone}</td></tr>`+
           `<tr><td>Allergy</td><td>${customer.allergy}</td></tr>`+
           `<tr><td>Etc</td><td>${customer.etc}</td></tr>`+
           `<tr><td>Delivery Option</td><td>${customer.delivery}</td></tr>`;
      
      let sold_content = '<table style="margin-top:10px; background: rgba(248, 227, 222, 0.6); width:350px; padding: 5px;"><tr><td>Product</td><td style="text-align:center">Amount</td><td style="text-align:center">Price</td></tr>';     
  
      if(customer.delivery == "delivery")  {
        email_content +=
        `<tr><td>Address</td><td>${customer.address} (${customer.postal_code})</td></tr></table>`;
  
          var i = 1;
          var l = 0;
          
          while(i < order.length) {
            
            var sold = parseInt(order[i].amount) *  parseFloat(order[i].price) * parseFloat(order[i].set_value);
  
            if(order[i].type == 'dacquoise') {
              dacq_num += parseInt(order[i].amount);
              sold_content +=
            `<tr><td>${order[i].item_name}</td><td style="text-align:center">${order[i].amount}</td><td style="text-align:center">${sold.toFixed(2)}</td></tr>`;
            }
  
            if(order[i].type == 'dacquoise-set') {
            
              let tasteList = JSON.parse(order[i].taste_set);
              let tasteText = "";
  
              for(var t=0; t<tasteList.length; t++) {
                tasteText += tasteList[t].taste+`(${tasteList[t].amount})`+" ";
              }
              
                dacq_num += parseInt(order[i].amount);
                sold_content +=
              `<tr><td>${order[i].item_name}</td><td style="text-align:center">${order[i].amount}</td><td style="text-align:center">${sold.toFixed(2)}</td></tr>`;
    
              sold_content +=
              `<tr><td colspan=3>${tasteText} x${order[i].amount}</td></tr>`;
    
              }
  
            if(order[i].type == 'cake') {
              cake_num += parseInt(order[i].amount);
  
              var inchT = '';
  
              if(order[i].set_value == '1') {
                  inchT = inch[0];
              }
  
              else {
                inchT = inch[1];
              }
              
              sold_content +=
            `<tr><td>${order[i].item_name} ${inchT} ${order[i].taste_set}</td><td style="text-align:center">${order[i].amount}</td><td style="text-align:center">${sold.toFixed(2)}</td></tr>`;
            
              if((customer.lettering).length > 0) {
              for(var c=0; c<order[i].amount; c++) {
              sold_content += `<tr><td colspan=3>lettering: ${customer.lettering[l]}</td></tr>`;
              l++; }}
            }
            
            sum += parseFloat(sold);
  
            i++;
          }
          
          sum += parseFloat(customer.delivery_fee);
                  
          sold_content +=
          `<tr><td colspan=2>Delivery Fee</td><td style="text-align:center">${customer.delivery_fee}</td>`+
          `<tr><td colspan=2>Total</td><td style="text-align:center">${sum.toFixed(2)}</td></tr></table>`;
        }
  
      else {
  
        time_array = (customer.pickup_time).split(':'); 
        pick_time = time_array[0];
  
        email_content +=
        `<tr><td>Pickup time</td><td>${customer.pickup_time}</td></tr></table>`;
        
        var i = 1;
          var l = 0;
  
          while(i < order.length) {
            
            var sold = parseFloat(order[i].amount) *  parseFloat(order[i].price) * parseFloat(order[i].set_value);
  
            if(order[i].type == 'dacquoise') {
              dacq_num += parseInt(order[i].amount);
              sold_content +=
            `<tr><td>${order[i].item_name}</td><td style="text-align:center">${order[i].amount}</td><td style="text-align:center">${sold.toFixed(2)}</td></tr>`;
            }
  
            if(order[i].type == 'dacquoise-set') {
            
              let tasteList = JSON.parse(order[i].taste_set);
              let tasteText = "";
  
              for(var t=0; t<tasteList.length; t++) {
                tasteText += tasteList[t].taste+`(${tasteList[t].amount})`+" ";
              }
              
                dacq_num += parseInt(order[i].amount);
                sold_content +=
              `<tr><td>${order[i].item_name}</td><td style="text-align:center">${order[i].amount}</td><td style="text-align:center">${sold.toFixed(2)}</td></tr>`;
    
              sold_content +=
              `<tr><td colspan=3>${tasteText} x${order[i].amount}</td></tr>`;
    
              }
  
            if(order[i].type == 'cake') {
              cake_num += parseInt(order[i].amount);
  
              var inchT = '';
  
              if(order[i].set_value == '1') {
                  inchT = inch[0];
              }
  
              else {
                inchT = inch[1];
              }
              
              sold_content +=
            `<tr><td>${order[i].item_name} ${inchT} ${order[i].taste_set}</td><td style="text-align:center">${order[i].amount}</td><td style="text-align:center">${sold.toFixed(2)}</td></tr>`;
            
          
            if((customer.lettering).length > 0) {
            for(var c=0; c<order[i].amount; c++) {
              sold_content += `<tr><td colspan=3>${customer.lettering[l]}</td></tr>`;
              l++; }}
            }
                      
            sum += parseFloat(sold);
  
            i++;
          }
  
          sold_content +=
          `<tr><td colspan=2>Total</td><td style="text-align:center">${sum.toFixed(2)}</td></tr></table>`;
  
        }
  
    let final_content = email_content + sold_content + "</div></body>";
    
    const comeback_user = await Customer.findOne({$and: [{name: customer.name},{phone: customer.phone}]});
  
    if(!comeback_user) {
             
            var customer_info = {
              name: customer.name,
              insta_email: customer.insta,
              phone: customer.phone,
              allergy: customer.allergy
            }
  
            var new_customer = new Customer(customer_info);
                new_customer.save(function (err) {
                              if(!err) {
                  console.log(new_customer._id);
                  console.log("new customer info added");
                  
                  var sales_info = {
                    customer: new_customer._id,
                    order_date: date,
                    delivery_option: customer.delivery,
                    purchase: order,
                    address: customer.address,
                    delivery_fee: customer.delivery_fee,
                    total_price: sum.toFixed(2)
                  }
  
                  var new_sales = new Sales(sales_info);
                  new_sales.save(function (err) {
                    if(err) {
                      console.log(err.message);
                    }
                    
                    if(!err) {
                      console.log("sales info added");
  
                      async.parallel({
                        
                        limit: function(callback) {
                        
                          Limit.find({date: date})
                              .exec(callback)
                        }}, async (err, results) => {
                          if(err) {console.log(err.message);}
                          else{
                            console.log(results);
                            
                            //var pickup_time = results.limit[0];
                            
                            var pp =0;
                            var check = false;
                            
                            while(!check && pp < results.limit[0].pickup_time.length) {
                              
                                if(results.limit[0].pickup_time[pp].timeline == pick_time) {
                                  check = true;
                                  
                                  results.limit[0].pickup_time[pp].limit = results.limit[0].pickup_time[pp].limit - 1;
                                  console.log("pick limi: "+results.limit[0].pickup_time[pp].limit);
                                }
  
                                else {
                                  pp++;
                                }
                            }
  
                            var cake_limit = results.limit[0].cake_limit - cake_num;
                            var dacq_limit = results.limit[0].dacq_limit - dacq_num;
  
                            results.limit[0].cake_limit = cake_limit;
                            results.limit[0].dacq_limit = dacq_limit;
  
                            let update = await Limit.findByIdAndUpdate(results.limit[0]._id, results.limit[0], {});
                            
                            mailOptions.subject = 'Baking Bunny Order '+Date();
                            mailOptions.html = final_content;
  
                            transporter.sendMail(mailOptions, function() {
                              if(err) {console.log(err.meesage);}
                              
                              else {
                                console.log('Success Email');
                                res.redirect('/end/kor');
                              }
                            
                            });
                          }
                        })
                    }                  
                  })
                  }
                });
            }    
    
    else {
      var sales_info = {
        customer: comeback_user._id,
        order_date: date,
        delivery_option: customer.delivery,
        purchase: order,
        address: customer.address,
        delivery_fee: customer.delivery_fee,
        total_price: sum.toFixed(2)
      }
        
        var new_sales = new Sales(sales_info);
        new_sales.save(function (err) {
          if(!err) {
            console.log(new_sales._id);
            console.log("comeback customer");
            console.log("sales info added");
            
            async.parallel({
                        
              limit: function(callback) {
              
                Limit.find({date: date})
                    .exec(callback)
              }}, async (err, results) => {
                if(err) {console.log(err.message);}
                          else{
                            
                            //var pickup_time = results.limit[0];
                            
                            var pp =0;
                            var check = false;
                            
                            while(!check && pp < results.limit[0].pickup_time.length) {
                              
                                if(results.limit[0].pickup_time[pp].timeline == pick_time) {
                                  check = true;
                                  results.limit[0].pickup_time[pp].limit = results.limit[0].pickup_time[pp].limit - 1;
                                }
  
                                else {
                                  pp++;
                                }
                            }
  
                            var cake_limit = results.limit[0].cake_limit - cake_num;
                            var dacq_limit = results.limit[0].dacq_limit - dacq_num;
  
                            results.limit[0].cake_limit = cake_limit;
                            results.limit[0].dacq_limit = dacq_limit;
  
                            
  
                            let update = await Limit.findByIdAndUpdate(results.limit[0]._id, results.limit[0], {});
                  
                  mailOptions.subject = 'Baking Bunny Order-Comeback Customer'+Date();
                  mailOptions.html = final_content;
  
                  transporter.sendMail(mailOptions, function() {
                    if(err) {console.log(err.meesage);}
                    
                    else {
                      console.log('Success Email');
                      res.redirect('/end/eng');
                    }
                            
                  });
                }
              })
          }                  
        })
      }
    } catch(err) {
      console.log(err.message);
      next(err);
    }  
    
}   