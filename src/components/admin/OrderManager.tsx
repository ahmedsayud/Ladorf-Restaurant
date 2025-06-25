import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BASE_URL } from '../api/ConfigApi';

const PAGE_SIZE = 10;

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const tableRef = useRef(null);

  // Dialog state
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState('');

  let lastScrollTime = 0; // متغير خارج الدالة

  // جلب الطلبات مع دعم الصفحات
  const fetchOrders = async (pageNum = 1, reset = false) => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${BASE_URL}/api/admin/orders?page=${pageNum}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newOrders = response.data.data || [];
      setOrders(prev => reset ? newOrders : [...prev, ...newOrders]);
      setHasMore(newOrders.length === PAGE_SIZE);
    } catch (err) {
      setError('فشل في جلب الطلبات');
    } finally {
      setLoading(false);
    }
  };

  // عند أول تحميل
  useEffect(() => {
    fetchOrders(1, true);
    setPage(1);
  }, []);

  // تحديث تلقائي فقط عند تغير البيانات
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`${BASE_URL}/api/admin/orders?page=1`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const newOrders = response.data.data || [];
        // قارن أول 10 طلبات فقط (أو العدد المعروض)
        const isDifferent =
          newOrders.length !== orders.length ||
          newOrders.some((order, idx) => order.id !== orders[idx]?.id);
        if (isDifferent) {
          setOrders(newOrders);
          setPage(1);
        }
      } catch (err) {
        // تجاهل الخطأ أو أظهر رسالة إذا أردت
      }
    }, 10000); // كل 10 ثواني
    return () => clearInterval(interval);
  }, [orders]);

  // Infinite scroll: عند الوصول لأسفل الجدول
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < 700) return; // 700ms بين كل ريكوست
      lastScrollTime = now;
      if (!tableRef.current || loading || !hasMore) return;
      const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        fetchOrders(page + 1);
        setPage(prev => prev + 1);
      }
    };
    const ref = tableRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (ref) ref.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore, page]);

  // زر إعادة تحميل الكل من جديد
  const handleReload = () => {
    setOrders([]);
    setPage(1);
    setHasMore(true);
    fetchOrders(1, true);
  };

  // جلب تفاصيل الطلب عند فتح الديالوج
  const fetchOrderDetails = async (orderId) => {
    setDetailsLoading(true);
    setDetailsError('');
    setOrderDetails(null);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${BASE_URL}/api/admin/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrderDetails(response.data);
    } catch (err) {
      setDetailsError('فشل في جلب تفاصيل الطلب');
    } finally {
      setDetailsLoading(false);
    }
  };

  // عند فتح الديالوج
  useEffect(() => {
    if (selectedOrderId) {
      fetchOrderDetails(selectedOrderId);
    }
  }, [selectedOrderId]);

  // جلب تفاصيل المنتجات الناقصة تلقائياً
  useEffect(() => {
    orders.forEach(async (order, idx) => {
      if (!order.relationships?.items || order.relationships.items.length === 0) {
        try {
          const token = localStorage.getItem('adminToken');
          const response = await axios.get(`${BASE_URL}/api/admin/orders/${order.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const details = response.data;
          setOrders(prevOrders => {
            // إذا الطلب تغير مكانه في القائمة (بسبب تحديث تلقائي)، تجاهل التحديث
            const realIdx = prevOrders.findIndex(o => o.id === order.id);
            if (realIdx === -1) return prevOrders;
            const updated = [...prevOrders];
            updated[realIdx] = {
              ...order,
              relationships: {
                ...order.relationships,
                items: details.relationships.items || [],
              },
            };
            return updated;
          });
        } catch (err) {
          // تجاهل الخطأ أو أظهر رسالة إذا أردت
        }
      }
    });
  }, [orders]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إدارة الطلبات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button onClick={handleReload} className="bg-ladorf-600 hover:bg-ladorf-700 text-white">إعادة تحميل كل الطلبات</Button>
          </div>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <div ref={tableRef} style={{ maxHeight: 400, overflowY: 'auto' }} className="overflow-x-auto border rounded">
            <table className="min-w-full text-sm" dir="rtl">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">اسم العميل</th>
                  <th className="p-2 border">رقم الهاتف</th>
                  <th className="p-2 border">العنوان</th>
                  <th className="p-2 border">السعر النهائي</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <React.Fragment key={order.id}>
                    <tr className="border-b">
                      <td className="p-2 border">{order.id}</td>
                      <td className="p-2 border">{order.relationships?.user?.name}</td>
                      <td className="p-2 border">{order.relationships?.user?.phone}</td>
                      <td className="p-2 border">{order.data?.shipping_address}</td>
                      <td className="p-2 border">{order.data?.final_price} جنيه</td>
                    </tr>
                    {order.relationships?.items && order.relationships.items.length > 0 && (
                      <tr>
                        <td colSpan={5} className="bg-gray-50 p-0">
                          <div className="overflow-x-auto pb-2">
                            <table className="w-full text-sm border" dir="rtl">
                              <thead>
                                <tr className="bg-gray-200">
                                  <th className="p-2 border text-center">اسم المنتج</th>
                                  <th className="p-2 border text-center">التصنيف</th>
                                  <th className="p-2 border text-center">الكمية</th>
                                  <th className="p-2 border text-center">سعر الوحدة</th>
                                  <th className="p-2 border text-center">الإجمالي</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.relationships.items.map(item => (
                                  <tr key={item.id} className="even:bg-gray-50">
                                    <td className="p-2 border text-center">{item.item_name}</td>
                                    <td className="p-2 border text-center">{item.category_name}</td>
                                    <td className="p-2 border text-center">{item.quantity}</td>
                                    <td className="p-2 border text-center">{item.price} جنيه</td>
                                    <td className="p-2 border text-center">{item.total_price} جنيه</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
                {orders.length === 0 && !loading && (
                  <tr><td colSpan={5} className="text-center p-4">لا توجد طلبات</td></tr>
                )}
              </tbody>
            </table>
            {loading && <div className="text-center p-4">جاري التحميل...</div>}
            {!hasMore && orders.length > 0 && <div className="text-center p-2 text-gray-500">تم عرض كل الطلبات</div>}
          </div>
        </CardContent>
      </Card>

      {/* Dialog لعرض تفاصيل الطلب */}
      <Dialog open={!!selectedOrderId} onOpenChange={open => { if (!open) setSelectedOrderId(null); }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تفاصيل الطلب</DialogTitle>
          </DialogHeader>
          {detailsLoading && <div>جاري تحميل التفاصيل...</div>}
          {detailsError && <div className="text-red-600 mb-4">{detailsError}</div>}
          {orderDetails && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <div className="font-bold">اسم العميل:</div>
                  <div>{orderDetails.relationships?.user?.name}</div>
                </div>
                <div>
                  <div className="font-bold">رقم الهاتف:</div>
                  <div dir="ltr">{orderDetails.relationships?.user?.phone}</div>
                </div>
                <div>
                  <div className="font-bold">العنوان:</div>
                  <div>{orderDetails.data?.shipping_address}</div>
                </div>
                <div>
                  <div className="font-bold">السعر النهائي:</div>
                  <div>{orderDetails.data?.final_price} جنيه</div>
                </div>
              </div>
              <div>
                <div className="font-bold mb-2">المنتجات في الطلب:</div>
                <table className="min-w-full text-sm border" dir="rtl">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">اسم المنتج</th>
                      <th className="p-2 border">التصنيف</th>
                      <th className="p-2 border">الكمية</th>
                      <th className="p-2 border">سعر الوحدة</th>
                      <th className="p-2 border">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails.relationships?.items?.map(item => (
                      <tr key={item.id} className="border-b">
                        <td className="p-2 border">{item.item_name}</td>
                        <td className="p-2 border">{item.category_name}</td>
                        <td className="p-2 border">{item.quantity}</td>
                        <td className="p-2 border">{item.price} جنيه</td>
                        <td className="p-2 border">{item.total_price} جنيه</td>
                      </tr>
                    ))}
                    {(!orderDetails.relationships?.items || orderDetails.relationships.items.length === 0) && (
                      <tr><td colSpan={5} className="text-center p-4">لا توجد منتجات في هذا الطلب</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderManager; 