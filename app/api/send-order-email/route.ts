import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const orderData = await request.json()

    // Format order items for email
    const itemsList = orderData.items
      .map(
        (item: any) =>
          `- ${item.name} (${item.category}) x ${item.quantity} = €${(
            Number.parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity
          ).toFixed(2)}`,
      )
      .join("\n")

    // Customer email content
    const customerEmailContent = `
Dear ${orderData.customer.fullName},

Thank you for your order at Sher-e-Punjab!

Your order has been confirmed and will be delivered in 5-7 business days.

ORDER DETAILS:
${itemsList}

DELIVERY ADDRESS:
${orderData.customer.address}
${orderData.customer.city}, ${orderData.customer.postalCode}
${orderData.customer.country}

ORDER SUMMARY:
Subtotal: €${orderData.totals.subtotal.toFixed(2)}
Tax (8%): €${orderData.totals.tax.toFixed(2)}
Shipping: €${orderData.totals.shipping.toFixed(2)}
Total: €${orderData.totals.total.toFixed(2)}

PAYMENT METHOD: Cash on Delivery

${orderData.customer.notes ? `SPECIAL INSTRUCTIONS:\n${orderData.customer.notes}\n\n` : ""}
We will contact you at ${orderData.customer.phone} if we need any clarification.

Thank you for shopping with us!

Best regards,
Sher-e-Punjab Team
    `.trim()

    // Store owner email content
    const storeOwnerEmailContent = `
NEW ORDER RECEIVED!

Customer: ${orderData.customer.fullName}
Email: ${orderData.customer.email}
Phone: ${orderData.customer.phone}

DELIVERY ADDRESS:
${orderData.customer.address}
${orderData.customer.city}, ${orderData.customer.postalCode}
${orderData.customer.country}

ORDER ITEMS:
${itemsList}

ORDER SUMMARY:
Subtotal: €${orderData.totals.subtotal.toFixed(2)}
Tax (8%): €${orderData.totals.tax.toFixed(2)}
Shipping: €${orderData.totals.shipping.toFixed(2)}
Total: €${orderData.totals.total.toFixed(2)}

PAYMENT METHOD: Cash on Delivery

${orderData.customer.notes ? `SPECIAL INSTRUCTIONS:\n${orderData.customer.notes}\n\n` : ""}
Order Date: ${new Date(orderData.orderDate).toLocaleString()}
    `.trim()

    // In a real application, you would use an email service like SendGrid, Resend, or Nodemailer
    // For now, we'll log the emails and return success
    console.log("=== CUSTOMER EMAIL ===")
    console.log(`To: ${orderData.customer.email}`)
    console.log(`Subject: Order Confirmation - Sher-e-Punjab`)
    console.log(customerEmailContent)
    console.log("\n=== STORE OWNER EMAIL ===")
    console.log(`To: sher.e.punjab.store2025@gmail.com`)
    console.log(`Subject: New Order Received`)
    console.log(storeOwnerEmailContent)

    // TODO: Implement actual email sending here
    // Example with a hypothetical email service:
    // await emailService.send({
    //   to: orderData.customer.email,
    //   subject: "Order Confirmation - Sher-e-Punjab",
    //   text: customerEmailContent,
    // })
    //
    // await emailService.send({
    //   to: "sher.e.punjab.store2025@gmail.com",
    //   subject: "New Order Received",
    //   text: storeOwnerEmailContent,
    // })

    return NextResponse.json({
      success: true,
      message: "Order confirmation emails sent successfully",
    })
  } catch (error) {
    console.error("Error sending order emails:", error)
    return NextResponse.json({ success: false, message: "Failed to send emails" }, { status: 500 })
  }
}
