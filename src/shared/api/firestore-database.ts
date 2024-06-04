/* eslint-disable no-underscore-dangle */
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';

import { ReactiveApi } from 'src/shared/types';
import IDatabase = ReactiveApi.IDatabase;
import IDatabaseSubscription = ReactiveApi.IDatabaseSubscription;
import IDatabaseQuery = ReactiveApi.IDatabaseQuery;

export class FirebaseDatabase implements IDatabase {
  private db = getFirestore();

  private subscriptions: IDatabaseSubscription[] = [];

  private _query(path: string, queryObj: IDatabaseQuery) {
    const c = collection(this.db, path);
    const matchesQuerySchema =
      'fieldPath' in queryObj && 'filter' in queryObj && 'value' in queryObj;

    if (matchesQuerySchema) {
      const { fieldPath, filter, value } = queryObj;
      return query(c, where(fieldPath, filter, value));
    }

    return c;
  }

  async get<T>(path: string, queryObj?: IDatabaseQuery): Promise<T> {
    const q = this._query(path, queryObj || ({} as IDatabaseQuery));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(snapshotDoc =>
      snapshotDoc.data(),
    ) as unknown as T;
  }

  async post<D extends Record<string, any>, T>(
    path: string,
    data: D,
  ): Promise<T> {
    const docRef = await addDoc(collection(this.db, path), data);
    return { id: docRef.id, ...data } as unknown as T;
  }

  async put<D extends Record<string, any>, T>(
    path: string,
    data: D,
  ): Promise<T> {
    const docRef = doc(this.db, path);
    await updateDoc(docRef, data);
    return { id: docRef.id, ...data } as unknown as T;
  }

  async patch<D extends Record<string, any>, T>(
    path: string,
    data: D,
  ): Promise<T> {
    return this.put(path, data);
  }

  async delete<T>(path: string): Promise<T> {
    const docRef = doc(this.db, path);
    await deleteDoc(docRef);
    return { id: docRef.id } as unknown as T;
  }

  subscribe<T>(
    path: string,
    onUpdate: (data: T) => void,
    queryObj?: IDatabaseQuery,
  ): IDatabaseSubscription[] {
    const q = this._query(path, queryObj || ({} as IDatabaseQuery));
    const subscription = onSnapshot(q, querySnapshot => {
      const data = querySnapshot.docs.map(snapshotDoc => ({
        id: snapshotDoc.id,
        ...snapshotDoc.data(),
      })) as unknown as T;
      onUpdate(data);
    });

    this.subscriptions.push(subscription);

    return this.subscriptions;
  }
}
