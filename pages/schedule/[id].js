
// pages/schedule/[id].js

import Layout from '@/components/Layout';
import Grid from '@/components/Grid';
import { prisma } from '@/lib/prisma';
import { format, parseISO } from 'date-fns'

// Instantiate it
BigInt.prototype.toJSON = function() {
  return this.toString()
}

export async function getServerSideProps({ params }) {
  // Get all accounts
  const data = await prisma.$queryRaw`SELECT s.*, (select count(*) from Appointment where schedule_id = s.schedule_id AND parent_id IS NOT NULL) AS appointment_count from Schedule s WHERE account_id = 36 AND start_time > DATE_SUB(NOW(), INTERVAL 30 DAY)`
  // const data = await prisma.schedule.findMany({
  //   where: { account_id: Number(params.id)},
  //   include: {
  //     _count: {
  //       select: {
  //         appointments: true
  //       }
  //     }
  //   }
  // })
  // Pass the data to the Home page
  return {
    props: {
      schedule: JSON.parse(JSON.stringify(data)),
    }
  };
}

export default function Schedule({ schedule = {}}) {

  return (
    <div className="container mx-auto px-15">
      <h1 className="text-4xl">Schedules</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Therapist</th>
            <th>Appointments</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {schedule.map(item => (
          <tr>
            <td>{format(parseISO(item.schedule_date), "EEE MM/dd/yyyy")}</td>
            <td>{format(parseISO(item.start_time), "H:mm aaa")} to {format(parseISO(item.end_time), "H:mm aaa")}</td>
            <td>{item.therapist}</td>
            <td></td>
            <td>{item.appointment_count}</td>
            <td>{item.schedule_id}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}