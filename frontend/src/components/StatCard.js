export const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow'>
    <div className='flex items-center justify-between'>
      <div>
        <h3 className='text-gray-500 text-sm font-medium mb-1'>{title}</h3>
        <div className='flex items-baseline'>
          <span className='text-3xl font-bold text-gray-900'>{value}</span>
        </div>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className='w-6 h-6 text-white' />
      </div>
    </div>
  </div>
);
